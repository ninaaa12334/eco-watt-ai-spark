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

    // Check if household already exists
    const { data: existing } = await supabase.from("households").select("id").eq("user_id", userId).maybeSingle();
    if (existing) {
      return new Response(JSON.stringify({ message: "Data already seeded", household_id: existing.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create household
    const { data: household, error: hErr } = await supabase.from("households").insert({
      user_id: userId,
      name: "Shtëpia ime",
      city: "Prishtinë",
      home_size_m2: 90,
      num_members: 4,
      meter_type: "dual",
      monthly_bill_avg: 85,
      energy_score: 68,
      eco_mode_active: false,
    }).select("id").single();

    if (hErr) throw hErr;
    const hId = household.id;

    // Insert devices
    const devices = [
      { name: "Samsung TV", category: "tv", brand: "Samsung", model: "55TU7000", room: "Dhoma e ndenjës", power_watts: 110, daily_usage_hours: 5, standby_watts: 8, is_on: true, is_standby: true, waste_detected: true, waste_kwh: 0.192, waste_reason: "Standby overnight 24h" },
      { name: "Kondicioneri", category: "ac", brand: "Gree", model: "Lomo 12k BTU", room: "Dhoma e gjumit", power_watts: 1200, daily_usage_hours: 8, standby_watts: 5, is_on: true, is_standby: false, waste_detected: true, waste_kwh: 2.4, waste_reason: "Running with window open" },
      { name: "Karikues telefoni", category: "charger", brand: "Apple", model: "20W USB-C", room: "Dhoma e gjumit", power_watts: 20, daily_usage_hours: 8, standby_watts: 2, is_on: true, is_standby: true, waste_detected: true, waste_kwh: 0.048, waste_reason: "Plugged in 6h after full charge" },
      { name: "Frigorifer", category: "fridge", brand: "Beko", model: "RDSA240K30", room: "Kuzhina", power_watts: 150, daily_usage_hours: 24, standby_watts: 0, is_on: true, is_standby: false, waste_detected: false, waste_kwh: 0, waste_reason: null },
      { name: "Lavatriçe", category: "washing_machine", brand: "LG", model: "F4WV308S6U", room: "Banjo", power_watts: 500, daily_usage_hours: 1, standby_watts: 3, is_on: false, is_standby: true, waste_detected: true, waste_kwh: 0.072, waste_reason: "Standby power consumption" },
      { name: "PlayStation 5", category: "console", brand: "Sony", model: "PS5", room: "Dhoma e ndenjës", power_watts: 200, daily_usage_hours: 3, standby_watts: 10, is_on: false, is_standby: true, waste_detected: true, waste_kwh: 0.21, waste_reason: "Rest mode consuming 10W continuously" },
      { name: "Drita e kuzhinës", category: "light", brand: "Philips", model: "LED 12W", room: "Kuzhina", power_watts: 12, daily_usage_hours: 6, standby_watts: 0, is_on: true, is_standby: false, waste_detected: true, waste_kwh: 0.019, waste_reason: "Left on 95min without movement" },
      { name: "Bojleri", category: "boiler", brand: "Ariston", model: "Pro1 80L", room: "Banjo", power_watts: 1500, daily_usage_hours: 3, standby_watts: 0, is_on: true, is_standby: false, waste_detected: false, waste_kwh: 0, waste_reason: null },
      { name: "Laptop", category: "laptop", brand: "HP", model: "Pavilion 15", room: "Zyra", power_watts: 65, daily_usage_hours: 8, standby_watts: 3, is_on: true, is_standby: false, waste_detected: false, waste_kwh: 0, waste_reason: null },
      { name: "Ngrohësi", category: "heater", brand: "DeLonghi", model: "HCX3220FTS", room: "Dhoma e ndenjës", power_watts: 2000, daily_usage_hours: 4, standby_watts: 0, is_on: false, is_standby: false, waste_detected: true, waste_kwh: 1.2, waste_reason: "Running 2h longer than needed" },
      { name: "Karikues laptopi", category: "charger", brand: "HP", model: "65W", room: "Zyra", power_watts: 65, daily_usage_hours: 10, standby_watts: 4, is_on: true, is_standby: true, waste_detected: true, waste_kwh: 0.056, waste_reason: "Left plugged in overnight" },
      { name: "Drita e dhomës së gjumit", category: "light", brand: "IKEA", model: "LED 9W", room: "Dhoma e gjumit", power_watts: 9, daily_usage_hours: 4, standby_watts: 0, is_on: false, is_standby: false, waste_detected: false, waste_kwh: 0, waste_reason: null },
    ];

    const { data: insertedDevices, error: dErr } = await supabase.from("devices").insert(
      devices.map((d) => ({ ...d, household_id: hId }))
    ).select("id, name");
    if (dErr) throw dErr;

    // Insert alerts
    const alerts = [
      { type: "waste", severity: "high", message_sq: "Karikuesi i telefonit ka qenë i lidhur për 6 orë pas karikimit të plotë.", message_en: "Phone charger has been plugged in for 6 hours after full charge." },
      { type: "waste", severity: "high", message_sq: "TV-ja ka konsumuar energji gjatë natës në dhomën e ndenjës (standby).", message_en: "TV standby usage detected overnight in the living room." },
      { type: "waste", severity: "medium", message_sq: "Dritat e kuzhinës kanë mbetur ndezur për 95 minuta pa lëvizje.", message_en: "Kitchen lights remained on for 95 minutes without movement." },
      { type: "waste", severity: "critical", message_sq: "Kondicioneri po punon ndërsa dritarja është e hapur.", message_en: "Air conditioner is running while the window is open." },
      { type: "savings", severity: "medium", message_sq: "Fikja e pajisjeve në standby tani mund të kursejë 11% këtë javë.", message_en: "Switching off idle devices now could save 11% this week." },
      { type: "waste", severity: "medium", message_sq: "PlayStation 5 në rest mode ka konsumuar 10W vazhdimisht.", message_en: "PlayStation 5 in rest mode consuming 10W continuously." },
    ];

    await supabase.from("alerts").insert(alerts.map((a) => ({ ...a, household_id: hId })));

    // Insert recommendations
    const recs = [
      { text_sq: "Kondicionimi i ajrit është ndoshta shpenzuesi më i madh i energjisë. Zvogëloni përdorimin për 1 orë/ditë.", text_en: "Air conditioning is likely your largest electricity driver. Reduce usage by 1 hour/day.", impact: "high", estimated_savings_kwh: 36, estimated_savings_eur: 6.5 },
      { text_sq: "Dy TV duket se mbeten në standby gjatë natës. Fikini plotësisht.", text_en: "Two TVs appear to remain on standby overnight. Turn them off completely.", impact: "medium", estimated_savings_kwh: 5.76, estimated_savings_eur: 1.04 },
      { text_sq: "Karikuesit e lënë të lidhur çdo ditë mund të kontribuojnë në përdorim të panevojshëm.", text_en: "Chargers left plugged in daily may contribute to avoidable standby use.", impact: "low", estimated_savings_kwh: 3.12, estimated_savings_eur: 0.56 },
      { text_sq: "Zvogëlimi i përdorimit të AC-së për 1 orë/ditë mund të kursejë €6-€9/muaj.", text_en: "Reducing AC use by 1 hour per day could save an estimated €6–€9 per month.", impact: "high", estimated_savings_kwh: 36, estimated_savings_eur: 8.5 },
    ];

    await supabase.from("recommendations").insert(recs.map((r) => ({ ...r, household_id: hId })));

    // Insert energy records (last 7 days)
    const today = new Date();
    const records = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const totalKwh = 8 + Math.random() * 6;
      const wasteKwh = 1.5 + Math.random() * 3;
      const dayKwh = totalKwh * (0.55 + Math.random() * 0.15);
      records.push({
        household_id: hId,
        date: d.toISOString().split("T")[0],
        total_kwh: Number(totalKwh.toFixed(3)),
        waste_kwh: Number(wasteKwh.toFixed(3)),
        day_kwh: Number(dayKwh.toFixed(3)),
        night_kwh: Number((totalKwh - dayKwh).toFixed(3)),
        cost_eur: Number((totalKwh * 0.0905).toFixed(2)),
        co2_kg: Number((totalKwh * 0.5).toFixed(3)),
      });
    }
    await supabase.from("energy_records").insert(records);

    // Insert bills (last 6 months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const billData = [];
    for (let i = 5; i >= 0; i--) {
      const m = new Date(today);
      m.setMonth(m.getMonth() - i);
      const totalKwh = 300 + Math.random() * 200;
      const dayKwh = totalKwh * (0.6 + Math.random() * 0.1);
      const nightKwh = totalKwh - dayKwh;
      const isAnomaly = i === 3 || i === 0;
      billData.push({
        household_id: hId,
        month: monthNames[m.getMonth()],
        year: m.getFullYear(),
        total_kwh: Number(totalKwh.toFixed(3)),
        day_kwh: Number(dayKwh.toFixed(3)),
        night_kwh: Number(nightKwh.toFixed(3)),
        total_cost_eur: Number((dayKwh * 0.0905 + nightKwh * 0.0388 + 2.32).toFixed(2)),
        day_cost_eur: Number((dayKwh * 0.0905).toFixed(2)),
        night_cost_eur: Number((nightKwh * 0.0388).toFixed(2)),
        is_anomaly: isAnomaly,
        anomaly_reason: isAnomaly ? "Unusually high daytime usage during expensive tariff periods" : null,
      });
    }
    await supabase.from("bills").insert(billData);

    // Insert tariff checks
    const tariffChecks = [
      { check_time: "22:00", expected_tariff: "night", actual_tariff: "night", is_correct: true },
      { check_time: "22:15", expected_tariff: "night", actual_tariff: "day", is_correct: false },
      { check_time: "22:30", expected_tariff: "night", actual_tariff: "night", is_correct: true },
      { check_time: "06:00", expected_tariff: "day", actual_tariff: "day", is_correct: true },
      { check_time: "06:15", expected_tariff: "day", actual_tariff: "night", is_correct: false },
    ];
    await supabase.from("tariff_checks").insert(tariffChecks.map((t) => ({ ...t, household_id: hId })));

    // Insert community reports
    await supabase.from("community_reports").insert([
      { user_id: userId, area: "Dardani", city: "Prishtinë", report_type: "meter_issue", description: "Njehsori nuk ndërron tarifën natën", status: "confirmed" },
      { user_id: userId, area: "Sunny Hill", city: "Prishtinë", report_type: "meter_issue", description: "Fatura e lartë pa arsye", status: "reviewing" },
      { user_id: userId, area: "Lakrishte", city: "Prishtinë", report_type: "billing_issue", description: "Ndryshim i papritur në faturë", status: "pending" },
      { user_id: userId, area: "Arbëria", city: "Prishtinë", report_type: "meter_issue", description: "Tarifa e natës aktivizohet vonë", status: "pending" },
    ]);

    return new Response(JSON.stringify({ message: "Seed data created successfully", household_id: hId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
