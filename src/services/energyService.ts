import { supabase } from "@/integrations/supabase/client";

// ─── Dashboard ───
export async function fetchDashboard(householdId: string) {
  const [devicesRes, alertsRes, recsRes, recordsRes, householdRes] = await Promise.all([
    supabase.from("devices").select("*").eq("household_id", householdId),
    supabase.from("alerts").select("*").eq("household_id", householdId).order("created_at", { ascending: false }),
    supabase.from("recommendations").select("*").eq("household_id", householdId),
    supabase.from("energy_records").select("*").eq("household_id", householdId).order("date", { ascending: true }),
    supabase.from("households").select("*").eq("id", householdId).single(),
  ]);

  const devices = devicesRes.data || [];
  const alerts = alertsRes.data || [];
  const recs = recsRes.data || [];
  const records = recordsRes.data || [];
  const household = householdRes.data;

  const totalKwh = devices.reduce((sum, d) => sum + (d.power_watts * (d.daily_usage_hours || 0)) / 1000, 0);
  const wasteKwh = devices.reduce((sum, d) => sum + (d.waste_kwh || 0), 0);
  const activeDevices = devices.filter((d) => d.is_on).length;
  const estimatedSavings = recs.reduce((sum, r) => sum + (r.estimated_savings_eur || 0), 0);
  const co2Reduction = recs.reduce((sum, r) => sum + (r.estimated_savings_kwh || 0) * 0.5, 0);

  return {
    household,
    totalKwh: Number(totalKwh.toFixed(1)),
    wasteKwh: Number(wasteKwh.toFixed(1)),
    activeDevices,
    alertCount: alerts.filter((a) => !a.is_read).length,
    estimatedSavings: Number(estimatedSavings.toFixed(2)),
    energyScore: household?.energy_score || 50,
    co2Reduction: Number(co2Reduction.toFixed(1)),
    ecoMode: household?.eco_mode_active || false,
    devices,
    alerts,
    recommendations: recs,
    records,
  };
}

// ─── Devices ───
export async function fetchDevices(householdId: string) {
  const { data, error } = await supabase.from("devices").select("*").eq("household_id", householdId).order("waste_detected", { ascending: false });
  if (error) throw error;
  return data;
}

export async function addDevice(device: {
  household_id: string;
  name: string;
  category: string;
  brand?: string;
  model?: string;
  room?: string;
  power_watts: number;
  daily_usage_hours?: number;
  standby_watts?: number;
}) {
  const { data, error } = await supabase.from("devices").insert(device).select().single();
  if (error) throw error;
  return data;
}

// ─── Alerts ───
export async function fetchAlerts(householdId: string) {
  const { data, error } = await supabase.from("alerts").select("*").eq("household_id", householdId).order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ─── Recommendations ───
export async function fetchRecommendations(householdId: string) {
  const { data, error } = await supabase.from("recommendations").select("*").eq("household_id", householdId).order("impact", { ascending: false });
  if (error) throw error;
  return data;
}

// ─── Savings ───
export async function fetchSavings(householdId: string) {
  const [recsRes, recordsRes, actionsRes] = await Promise.all([
    supabase.from("recommendations").select("estimated_savings_kwh, estimated_savings_eur").eq("household_id", householdId),
    supabase.from("energy_records").select("total_kwh, waste_kwh, co2_kg").eq("household_id", householdId),
    supabase.from("automation_actions").select("kwh_saved, eur_saved").eq("household_id", householdId),
  ]);

  const recs = recsRes.data || [];
  const records = recordsRes.data || [];
  const actions = actionsRes.data || [];

  const potentialKwh = recs.reduce((s, r) => s + (r.estimated_savings_kwh || 0), 0);
  const potentialEur = recs.reduce((s, r) => s + (r.estimated_savings_eur || 0), 0);
  const actualKwh = actions.reduce((s, a) => s + (a.kwh_saved || 0), 0);
  const actualEur = actions.reduce((s, a) => s + (a.eur_saved || 0), 0);
  const totalWaste = records.reduce((s, r) => s + (r.waste_kwh || 0), 0);
  const co2Total = records.reduce((s, r) => s + (r.co2_kg || 0), 0);

  return {
    potentialSavingsKwh: Number(potentialKwh.toFixed(1)),
    potentialSavingsEur: Number(potentialEur.toFixed(2)),
    actualSavingsKwh: Number(actualKwh.toFixed(1)),
    actualSavingsEur: Number(actualEur.toFixed(2)),
    totalWasteKwh: Number(totalWaste.toFixed(1)),
    co2Avoided: Number((co2Total * 0.3).toFixed(1)),
    monthlyProjection: Number((potentialEur * 4.3).toFixed(2)),
  };
}

// ─── Energy History ───
export async function fetchHistory(householdId: string) {
  const { data, error } = await supabase.from("energy_records").select("*").eq("household_id", householdId).order("date", { ascending: true });
  if (error) throw error;
  return data;
}

// ─── Bills ───
export async function fetchBills(householdId: string) {
  const { data, error } = await supabase.from("bills").select("*").eq("household_id", householdId).order("year", { ascending: true }).order("month", { ascending: true });
  if (error) throw error;
  return data;
}

// ─── Tariff Checks ───
export async function fetchTariffChecks(householdId: string) {
  const { data, error } = await supabase.from("tariff_checks").select("*").eq("household_id", householdId).order("check_date", { ascending: false });
  if (error) throw error;
  return data;
}

export async function addTariffCheck(check: {
  household_id: string;
  check_time: string;
  expected_tariff: string;
  actual_tariff: string;
  is_correct: boolean;
}) {
  const { data, error } = await supabase.from("tariff_checks").insert(check).select().single();
  if (error) throw error;
  return data;
}

// ─── Community Reports ───
export async function fetchCommunityReports() {
  const { data, error } = await supabase.from("community_reports").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function addCommunityReport(report: {
  user_id: string;
  area: string;
  city?: string;
  report_type?: string;
  description?: string;
}) {
  const { data, error } = await supabase.from("community_reports").insert(report).select().single();
  if (error) throw error;
  return data;
}

// ─── Actions ───
export async function performAction(action: string) {
  const { data, error } = await supabase.functions.invoke("energy-actions", {
    body: {},
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  // We need to pass action as query param, so use fetch directly
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  const projectId = import.meta.env.VITE_SUPABASE_URL?.replace("https://", "").replace(".supabase.co", "");
  
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/energy-actions?action=${action}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─── Household ───
export async function getOrCreateHousehold(userId: string) {
  const { data } = await supabase.from("households").select("*").eq("user_id", userId).maybeSingle();
  return data;
}

export async function seedUserData() {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/seed-data`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
