import { corsHeaders } from "@supabase/supabase-js/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

// Kosovo KEDS/KESCO 2026 tariffs (ERO-approved, effective since May 2025)
const TARIFFS = {
  fixed_monthly: 2.32,
  dual: {
    block1: { limit: 800, day: 0.0905, night: 0.0388 },
    block2: { day: 0.1543, night: 0.0728 },
  },
  single: {
    block1: { limit: 800, rate: 0.0712 },
    block2: { rate: 0.1239 },
  },
  peak_hours: {
    winter: { start: 7, end: 22 }, // Oct-Mar
    summer: { start: 8, end: 23 }, // Apr-Sep
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { total_kwh, day_kwh, night_kwh, total_cost, meter_type, previous_bills, image_base64, image_url } = body;

    // If image is provided, try AI OCR
    let extracted: any = null;
    if ((image_base64 || image_url) && LOVABLE_API_KEY) {
      extracted = await extractBillWithAI(image_base64, image_url);
    }

    const kwh = extracted?.total_kwh || total_kwh || 0;
    const dKwh = extracted?.day_kwh || day_kwh || kwh * 0.65;
    const nKwh = extracted?.night_kwh || night_kwh || kwh * 0.35;
    const reportedCost = extracted?.total_cost || total_cost || 0;
    const mType = meter_type || "dual";

    // Calculate expected cost
    let expectedCost = TARIFFS.fixed_monthly;
    if (mType === "dual") {
      if (dKwh <= TARIFFS.dual.block1.limit * 0.65) {
        expectedCost += dKwh * TARIFFS.dual.block1.day;
      } else {
        const block1Day = TARIFFS.dual.block1.limit * 0.65;
        expectedCost += block1Day * TARIFFS.dual.block1.day + (dKwh - block1Day) * TARIFFS.dual.block2.day;
      }
      if (nKwh <= TARIFFS.dual.block1.limit * 0.35) {
        expectedCost += nKwh * TARIFFS.dual.block1.night;
      } else {
        const block1Night = TARIFFS.dual.block1.limit * 0.35;
        expectedCost += block1Night * TARIFFS.dual.block1.night + (nKwh - block1Night) * TARIFFS.dual.block2.night;
      }
    } else {
      if (kwh <= TARIFFS.single.block1.limit) {
        expectedCost += kwh * TARIFFS.single.block1.rate;
      } else {
        expectedCost += TARIFFS.single.block1.limit * TARIFFS.single.block1.rate + (kwh - TARIFFS.single.block1.limit) * TARIFFS.single.block2.rate;
      }
    }

    expectedCost = Number(expectedCost.toFixed(2));
    const deviation = reportedCost > 0 ? ((reportedCost - expectedCost) / expectedCost) * 100 : 0;
    const dayNightRatio = nKwh > 0 ? (dKwh / nKwh) : 999;

    // Anomaly detection
    const anomalies: string[] = [];
    let status: "normal" | "review" | "suspicious" = "normal";

    if (Math.abs(deviation) > 15) {
      anomalies.push(deviation > 0
        ? `Bill is ${deviation.toFixed(1)}% higher than expected (€${reportedCost} vs expected €${expectedCost})`
        : `Bill is ${Math.abs(deviation).toFixed(1)}% lower than expected`);
      status = Math.abs(deviation) > 25 ? "suspicious" : "review";
    }

    if (dayNightRatio > 4) {
      anomalies.push("Unusually high day-to-night usage ratio. Most usage is during expensive peak hours.");
      status = status === "normal" ? "review" : status;
    }

    // Compare with previous bills
    if (previous_bills?.length > 0) {
      const avgPrev = previous_bills.reduce((s: number, b: any) => s + (b.total_kwh || 0), 0) / previous_bills.length;
      const change = ((kwh - avgPrev) / avgPrev) * 100;
      if (change > 20) {
        anomalies.push(`Consumption is ${change.toFixed(0)}% above your previous ${previous_bills.length}-month average`);
        status = change > 35 ? "suspicious" : "review";
      }
    }

    // Night tariff timing check
    const now = new Date();
    const month = now.getMonth();
    const isWinter = month >= 9 || month <= 2;
    const peakHours = isWinter ? TARIFFS.peak_hours.winter : TARIFFS.peak_hours.summer;

    const result = {
      extracted_data: extracted,
      analysis: {
        total_kwh: kwh,
        day_kwh: dKwh,
        night_kwh: nKwh,
        reported_cost: reportedCost,
        expected_cost: expectedCost,
        deviation_pct: Number(deviation.toFixed(1)),
        day_night_ratio: Number(dayNightRatio.toFixed(2)),
        status,
        anomalies,
        peak_hours: peakHours,
        tariffs_used: mType === "dual" ? TARIFFS.dual : TARIFFS.single,
        fixed_charge: TARIFFS.fixed_monthly,
      },
      recommendations: generateBillRecommendations(status, anomalies, dayNightRatio, deviation),
    };

    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Bill analysis error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

async function extractBillWithAI(base64?: string, url?: string) {
  try {
    const imageContent = url
      ? { type: "image_url" as const, image_url: { url } }
      : { type: "image_url" as const, image_url: { url: `data:image/jpeg;base64,${base64}` } };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an electricity bill OCR system. Extract data from Kosovo KEDS/KESCO bills." },
          { role: "user", content: [{ type: "text", text: "Extract total kWh, day kWh, night kWh, total cost in EUR from this electricity bill:" }, imageContent] },
        ],
        tools: [{
          type: "function",
          function: {
            name: "extract_bill",
            description: "Extract data from an electricity bill",
            parameters: {
              type: "object",
              properties: {
                total_kwh: { type: "number" },
                day_kwh: { type: "number" },
                night_kwh: { type: "number" },
                total_cost: { type: "number" },
                billing_period: { type: "string" },
                meter_number: { type: "string" },
              },
              required: ["total_kwh", "total_cost"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "extract_bill" } },
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) return JSON.parse(toolCall.function.arguments);
    return null;
  } catch { return null; }
}

function generateBillRecommendations(status: string, anomalies: string[], ratio: number, deviation: number) {
  const recs: { text_sq: string; text_en: string; priority: string }[] = [];

  if (status === "suspicious") {
    recs.push({
      text_sq: "Rekomandojmë të kontaktoni KEDS në 0800 791 00 për të verifikuar faturën.",
      text_en: "We recommend contacting KEDS at 0800 791 00 to verify this bill.",
      priority: "high",
    });
  }

  if (ratio > 3) {
    recs.push({
      text_sq: "Shumë përdorim gjatë tarifës së lartë. Provoni të zhvendosni aktivitete në orët e natës.",
      text_en: "Most usage is during peak tariff hours. Try shifting activities to night hours.",
      priority: "medium",
    });
  }

  if (deviation > 15) {
    recs.push({
      text_sq: "Gjeneroni një ankesë automatike me të dhënat e analizës.",
      text_en: "Generate an automatic complaint with the analysis data.",
      priority: "high",
    });
  }

  recs.push({
    text_sq: "Kontrolloni nëse njehsori ndërron tarifën në kohën e duhur.",
    text_en: "Check if the meter switches tariff at the correct time.",
    priority: "low",
  });

  return recs;
}
