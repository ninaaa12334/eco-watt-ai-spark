
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.households (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'My Home',
  city TEXT,
  home_size_m2 INTEGER,
  num_members INTEGER DEFAULT 1,
  meter_type TEXT DEFAULT 'dual' CHECK (meter_type IN ('single', 'dual')),
  monthly_bill_avg NUMERIC(10,2),
  energy_score INTEGER DEFAULT 50,
  eco_mode_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own households" ON public.households FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_households_updated_at BEFORE UPDATE ON public.households FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  room TEXT,
  power_watts NUMERIC(10,2) NOT NULL DEFAULT 0,
  daily_usage_hours NUMERIC(5,2) DEFAULT 0,
  standby_watts NUMERIC(10,2) DEFAULT 0,
  is_on BOOLEAN DEFAULT true,
  is_standby BOOLEAN DEFAULT false,
  waste_detected BOOLEAN DEFAULT false,
  waste_kwh NUMERIC(10,3) DEFAULT 0,
  waste_reason TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own devices" ON public.devices FOR ALL
  USING (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()))
  WITH CHECK (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()));
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON public.devices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  device_id UUID REFERENCES public.devices(id) ON DELETE SET NULL,
  type TEXT NOT NULL DEFAULT 'waste',
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message_sq TEXT NOT NULL,
  message_en TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own alerts" ON public.alerts FOR ALL
  USING (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()))
  WITH CHECK (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()));

CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  device_id UUID REFERENCES public.devices(id) ON DELETE SET NULL,
  text_sq TEXT NOT NULL,
  text_en TEXT NOT NULL,
  impact TEXT NOT NULL DEFAULT 'medium' CHECK (impact IN ('low', 'medium', 'high')),
  estimated_savings_kwh NUMERIC(10,3) DEFAULT 0,
  estimated_savings_eur NUMERIC(10,2) DEFAULT 0,
  is_applied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own recommendations" ON public.recommendations FOR ALL
  USING (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()))
  WITH CHECK (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()));

CREATE TABLE public.energy_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  total_kwh NUMERIC(10,3) DEFAULT 0,
  waste_kwh NUMERIC(10,3) DEFAULT 0,
  day_kwh NUMERIC(10,3) DEFAULT 0,
  night_kwh NUMERIC(10,3) DEFAULT 0,
  cost_eur NUMERIC(10,2) DEFAULT 0,
  co2_kg NUMERIC(10,3) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.energy_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own records" ON public.energy_records FOR ALL
  USING (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()))
  WITH CHECK (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()));

CREATE TABLE public.bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  total_kwh NUMERIC(10,3),
  day_kwh NUMERIC(10,3),
  night_kwh NUMERIC(10,3),
  total_cost_eur NUMERIC(10,2),
  day_cost_eur NUMERIC(10,2),
  night_cost_eur NUMERIC(10,2),
  is_anomaly BOOLEAN DEFAULT false,
  anomaly_reason TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own bills" ON public.bills FOR ALL
  USING (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()))
  WITH CHECK (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()));

CREATE TABLE public.tariff_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  check_time TIME NOT NULL,
  expected_tariff TEXT NOT NULL CHECK (expected_tariff IN ('day', 'night')),
  actual_tariff TEXT NOT NULL CHECK (actual_tariff IN ('day', 'night')),
  is_correct BOOLEAN NOT NULL,
  check_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tariff_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own tariff checks" ON public.tariff_checks FOR ALL
  USING (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()))
  WITH CHECK (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()));

CREATE TABLE public.community_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  area TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Prishtinë',
  report_type TEXT NOT NULL DEFAULT 'meter_issue',
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'confirmed', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.community_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can create reports" ON public.community_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view reports" ON public.community_reports FOR SELECT USING (true);

CREATE TABLE public.automation_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL,
  description_sq TEXT NOT NULL,
  description_en TEXT NOT NULL,
  kwh_saved NUMERIC(10,3) DEFAULT 0,
  eur_saved NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.automation_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own actions" ON public.automation_actions FOR ALL
  USING (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()))
  WITH CHECK (household_id IN (SELECT id FROM public.households WHERE user_id = auth.uid()));

CREATE INDEX idx_devices_household ON public.devices(household_id);
CREATE INDEX idx_alerts_household ON public.alerts(household_id);
CREATE INDEX idx_recommendations_household ON public.recommendations(household_id);
CREATE INDEX idx_energy_records_household_date ON public.energy_records(household_id, date);
CREATE INDEX idx_bills_household ON public.bills(household_id);
CREATE INDEX idx_tariff_checks_household ON public.tariff_checks(household_id);
CREATE INDEX idx_community_reports_area ON public.community_reports(area);
CREATE INDEX idx_automation_actions_household ON public.automation_actions(household_id);
