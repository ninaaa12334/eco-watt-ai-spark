import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claims, error: claimsErr } = await supabase.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }
    const userId = claims.claims.sub as string;

    const { data: household } = await supabase.from("households").select("id").eq("user_id", userId).single();
    if (!household) {
      return new Response(JSON.stringify({ error: "No household found" }), { status: 404, headers: corsHeaders });
    }
    const hId = household.id;

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
    }

    let result: { description_sq: string; description_en: string; kwh_saved: number; eur_saved: number; action_type: string };

    switch (action) {
      case "turn-off-standby": {
        await supabase.from("devices").update({ is_standby: false, waste_detected: false, waste_kwh: 0 }).eq("household_id", hId).eq("is_standby", true);
        result = { action_type: "turn-off-standby", description_sq: "Pajisjet në standby u fikën", description_en: "Standby devices turned off", kwh_saved: 0.578, eur_saved: 0.052 };
        break;
      }
      case "eco-mode": {
        await supabase.from("households").update({ eco_mode_active: true }).eq("id", hId);
        result = { action_type: "eco-mode", description_sq: "Mënyra Eco u aktivizua", description_en: "Eco mode activated", kwh_saved: 2.1, eur_saved: 0.19 };
        break;
      }
      case "unplug-chargers": {
        await supabase.from("devices").update({ is_on: false, waste_detected: false, waste_kwh: 0 }).eq("household_id", hId).eq("category", "charger");
        result = { action_type: "unplug-chargers", description_sq: "Karikuesit u shkëputën", description_en: "Chargers unplugged", kwh_saved: 0.104, eur_saved: 0.009 };
        break;
      }
      case "optimize-cooling": {
        await supabase.from("devices").update({ daily_usage_hours: 6, waste_detected: false, waste_kwh: 0 }).eq("household_id", hId).eq("category", "ac");
        result = { action_type: "optimize-cooling", description_sq: "Ftohja u optimizua", description_en: "Cooling optimized", kwh_saved: 2.4, eur_saved: 0.217 };
        break;
      }
      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: corsHeaders });
    }

    // Recalculate energy score
    const { data: devices } = await supabase.from("devices").select("waste_detected").eq("household_id", hId);
    const wasteCount = devices?.filter((d) => d.waste_detected).length || 0;
    const totalCount = devices?.length || 1;
    const newScore = Math.round(100 - (wasteCount / totalCount) * 50);
    await supabase.from("households").update({ energy_score: newScore }).eq("id", hId);

    // Log action
    await supabase.from("automation_actions").insert({ ...result, household_id: hId });

    return new Response(JSON.stringify({ success: true, ...result, new_energy_score: newScore }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
