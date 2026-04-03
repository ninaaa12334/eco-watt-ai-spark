import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsHeaders } from "@supabase/supabase-js/cors";

// Average wattage database for device types
const DEVICE_WATTAGE: Record<string, { watts: number; standby: number }> = {
  tv: { watts: 110, standby: 8 },
  ac: { watts: 1200, standby: 5 },
  heater: { watts: 2000, standby: 0 },
  fridge: { watts: 150, standby: 0 },
  washing_machine: { watts: 500, standby: 3 },
  charger: { watts: 20, standby: 2 },
  laptop: { watts: 65, standby: 3 },
  boiler: { watts: 1500, standby: 0 },
  console: { watts: 200, standby: 10 },
  light: { watts: 12, standby: 0 },
  fan: { watts: 75, standby: 0 },
  microwave: { watts: 1000, standby: 3 },
  oven: { watts: 2400, standby: 5 },
  dishwasher: { watts: 1800, standby: 2 },
  dryer: { watts: 3000, standby: 3 },
  vacuum: { watts: 1400, standby: 0 },
  iron: { watts: 2200, standby: 0 },
  router: { watts: 12, standby: 12 },
  monitor: { watts: 40, standby: 1 },
  speaker: { watts: 15, standby: 2 },
  other: { watts: 100, standby: 2 },
};

// Kosovo tariffs
const TARIFF_DAY = 0.0905;
const TARIFF_NIGHT = 0.0388;
const CO2_PER_KWH = 0.5; // kg CO2 per kWh (Kosovo grid)

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claims, error: claimsErr } = await supabase.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = claims.claims.sub as string;

    const { data: household } = await supabase.from("households").select("*").eq("user_id", userId).single();
    if (!household) {
      return new Response(JSON.stringify({ error: "No household found. Create a household first." }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: devices } = await supabase.from("devices").select("*").eq("household_id", household.id);
    if (!devices || devices.length === 0) {
      return new Response(JSON.stringify({ error: "No devices found. Add devices first." }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Calculate energy use per device
    const deviceAnalysis = devices.map((d) => {
      const watts = d.power_watts || DEVICE_WATTAGE[d.category]?.watts || 100;
      const standbyWatts = d.standby_watts || DEVICE_WATTAGE[d.category]?.standby || 0;
      const hours = d.daily_usage_hours || 4;
      const standbyHours = 24 - hours;

      const dailyActiveKwh = (watts * hours) / 1000;
      const dailyStandbyKwh = d.is_standby ? (standbyWatts * standbyHours) / 1000 : 0;
      const dailyKwh = dailyActiveKwh + dailyStandbyKwh;
      const monthlyKwh = dailyKwh * 30;
      const monthlyCost = monthlyKwh * (0.65 * TARIFF_DAY + 0.35 * TARIFF_NIGHT);
      const wasteKwh = dailyStandbyKwh * 30;

      // Detect waste patterns
      let wasteDetected = false;
      let wasteReason: string | null = null;

      if (d.is_standby && standbyWatts > 3) {
        wasteDetected = true;
        wasteReason = `Standby consuming ${standbyWatts}W for ~${standbyHours}h/day`;
      }
      if (d.category === "charger" && hours > 3) {
        wasteDetected = true;
        wasteReason = `Charger plugged in ${hours}h/day, likely after full charge`;
      }
      if (d.category === "ac" && hours > 10) {
        wasteDetected = true;
        wasteReason = `AC running ${hours}h/day, consider reducing by 1-2h`;
      }
      if (d.category === "light" && hours > 10) {
        wasteDetected = true;
        wasteReason = `Lights on ${hours}h/day, possible waste in empty rooms`;
      }
      if (d.category === "heater" && hours > 6) {
        wasteDetected = true;
        wasteReason = `Heater running ${hours}h/day, may be excessive`;
      }

      return {
        id: d.id,
        name: d.name,
        category: d.category,
        room: d.room,
        daily_kwh: Number(dailyKwh.toFixed(3)),
        monthly_kwh: Number(monthlyKwh.toFixed(1)),
        monthly_cost: Number(monthlyCost.toFixed(2)),
        waste_kwh: Number(wasteKwh.toFixed(3)),
        waste_detected: wasteDetected,
        waste_reason: wasteReason,
      };
    });

    // Sort by monthly kWh descending
    deviceAnalysis.sort((a, b) => b.monthly_kwh - a.monthly_kwh);

    const totalMonthlyKwh = deviceAnalysis.reduce((s, d) => s + d.monthly_kwh, 0);
    const totalMonthlyCost = deviceAnalysis.reduce((s, d) => s + d.monthly_cost, 0);
    const totalWasteKwh = deviceAnalysis.reduce((s, d) => s + d.waste_kwh, 0);
    const wastePct = totalMonthlyKwh > 0 ? (totalWasteKwh / totalMonthlyKwh) * 100 : 0;
    const co2Monthly = totalMonthlyKwh * CO2_PER_KWH;
    const wasteDevices = deviceAnalysis.filter((d) => d.waste_detected);
    const potentialSavingsKwh = wasteDevices.reduce((s, d) => s + d.waste_kwh, 0);
    const potentialSavingsEur = potentialSavingsKwh * (0.65 * TARIFF_DAY + 0.35 * TARIFF_NIGHT);

    // Energy score: 100 - penalty for waste
    const energyScore = Math.max(10, Math.round(100 - wastePct * 2 - wasteDevices.length * 3));

    // Generate recommendations
    const recommendations = generateRecommendations(deviceAnalysis, wasteDevices);

    // Update household energy score
    await supabase.from("households").update({ energy_score: energyScore }).eq("id", household.id);

    // Update device waste status
    for (const d of deviceAnalysis) {
      await supabase.from("devices").update({
        waste_detected: d.waste_detected,
        waste_kwh: d.waste_kwh,
        waste_reason: d.waste_reason,
      }).eq("id", d.id);
    }

    // Upsert recommendations
    await supabase.from("recommendations").delete().eq("household_id", household.id);
    if (recommendations.length > 0) {
      await supabase.from("recommendations").insert(
        recommendations.map((r) => ({ ...r, household_id: household.id }))
      );
    }

    // Create/update today's energy record
    const today = new Date().toISOString().split("T")[0];
    const dailyKwh = totalMonthlyKwh / 30;
    await supabase.from("energy_records").upsert({
      household_id: household.id,
      date: today,
      total_kwh: Number(dailyKwh.toFixed(3)),
      waste_kwh: Number((totalWasteKwh / 30).toFixed(3)),
      day_kwh: Number((dailyKwh * 0.65).toFixed(3)),
      night_kwh: Number((dailyKwh * 0.35).toFixed(3)),
      cost_eur: Number((totalMonthlyCost / 30).toFixed(2)),
      co2_kg: Number((co2Monthly / 30).toFixed(3)),
    }, { onConflict: "household_id,date", ignoreDuplicates: false });

    // Generate alerts for waste
    await supabase.from("alerts").delete().eq("household_id", household.id);
    const alerts = wasteDevices.slice(0, 6).map((d) => ({
      household_id: household.id,
      device_id: d.id,
      type: "waste",
      severity: d.waste_kwh > 1 ? "high" : d.waste_kwh > 0.1 ? "medium" : "low",
      message_sq: d.waste_reason || `Humbje energjie e detektuar tek ${d.name}`,
      message_en: d.waste_reason || `Energy waste detected at ${d.name}`,
    }));
    if (alerts.length > 0) {
      await supabase.from("alerts").insert(alerts);
    }

    return new Response(JSON.stringify({
      summary: {
        total_monthly_kwh: Number(totalMonthlyKwh.toFixed(1)),
        total_monthly_cost: Number(totalMonthlyCost.toFixed(2)),
        total_waste_kwh: Number(totalWasteKwh.toFixed(1)),
        waste_percentage: Number(wastePct.toFixed(1)),
        co2_monthly_kg: Number(co2Monthly.toFixed(1)),
        energy_score: energyScore,
        potential_savings_kwh: Number(potentialSavingsKwh.toFixed(1)),
        potential_savings_eur: Number(potentialSavingsEur.toFixed(2)),
        active_devices: devices.filter((d) => d.is_on).length,
        waste_devices: wasteDevices.length,
      },
      devices: deviceAnalysis,
      top_waste: deviceAnalysis.filter((d) => d.waste_detected).slice(0, 5),
      recommendations,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Calculate energy error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

function generateRecommendations(allDevices: any[], wasteDevices: any[]) {
  const recs: any[] = [];

  // Biggest consumer
  if (allDevices.length > 0) {
    const biggest = allDevices[0];
    recs.push({
      text_sq: `${biggest.name} është konsumatori më i madh (${biggest.monthly_kwh} kWh/muaj). Zvogëloni përdorimin për 1 orë/ditë.`,
      text_en: `${biggest.name} is your largest consumer (${biggest.monthly_kwh} kWh/month). Reduce usage by 1 hour/day.`,
      impact: "high",
      estimated_savings_kwh: biggest.monthly_kwh * 0.1,
      estimated_savings_eur: biggest.monthly_cost * 0.1,
      device_id: biggest.id,
    });
  }

  // Standby waste
  const standbyDevices = wasteDevices.filter((d) => d.waste_reason?.includes("Standby"));
  if (standbyDevices.length > 0) {
    const totalStandbyWaste = standbyDevices.reduce((s, d) => s + d.waste_kwh, 0);
    recs.push({
      text_sq: `${standbyDevices.length} pajisje janë në standby. Fikni ato plotësisht për të kursyer ${totalStandbyWaste.toFixed(1)} kWh/muaj.`,
      text_en: `${standbyDevices.length} devices are on standby. Turn them off completely to save ${totalStandbyWaste.toFixed(1)} kWh/month.`,
      impact: "medium",
      estimated_savings_kwh: totalStandbyWaste,
      estimated_savings_eur: totalStandbyWaste * 0.08,
    });
  }

  // Charger waste
  const chargers = wasteDevices.filter((d) => d.category === "charger");
  if (chargers.length > 0) {
    recs.push({
      text_sq: "Shkëputni karikuesit kur nuk janë në përdorim. Ato konsumojnë energji edhe pa pajisje.",
      text_en: "Unplug chargers when not in use. They consume energy even without a device.",
      impact: "low",
      estimated_savings_kwh: chargers.reduce((s, c) => s + c.waste_kwh, 0),
      estimated_savings_eur: chargers.reduce((s, c) => s + c.waste_kwh * 0.08, 0),
    });
  }

  // AC/heating optimization
  const hvac = wasteDevices.filter((d) => ["ac", "heater"].includes(d.category));
  if (hvac.length > 0) {
    recs.push({
      text_sq: "Zvogëloni kohën e përdorimit të ngrohjes/ftohjes. Sigurohuni që dritaret janë të mbyllura.",
      text_en: "Reduce heating/cooling runtime. Ensure windows are closed during operation.",
      impact: "high",
      estimated_savings_kwh: hvac.reduce((s, d) => s + d.monthly_kwh * 0.15, 0),
      estimated_savings_eur: hvac.reduce((s, d) => s + d.monthly_cost * 0.15, 0),
    });
  }

  return recs;
}
