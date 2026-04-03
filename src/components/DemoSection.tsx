import { useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard, usePerformAction } from "@/hooks/useEnergy";
import { Zap, AlertTriangle, DollarSign, Leaf, Award, TrendingDown, Lightbulb, Thermometer, Plug, Tv, Loader2 } from "lucide-react";
import { toast } from "sonner";

const recIcons = [Thermometer, Tv, Plug, Lightbulb];
const fallbackWastePcts = [38, 22, 15, 14, 11];

const DemoSection = () => {
  const { lang, t } = useLanguage();
  const d = t.demo;
  const { user } = useAuth();
  const { data: dash, isLoading } = useDashboard();
  const actionMut = usePerformAction();
  const [activeRec, setActiveRec] = useState(0);

  const recs = dash?.recommendations || [];
  const alerts = dash?.alerts || [];
  const devices = dash?.devices || [];

  useEffect(() => {
    const count = recs.length || d.recommendations.length;
    const timer = setInterval(() => setActiveRec((p) => (p + 1) % count), 3500);
    return () => clearInterval(timer);
  }, [recs.length]);

  // Calculate real usage (daily/monthly) from saved devices
  const sortedByUsage = [...devices]
    .map((dev) => {
      const runKwh = ((dev.power_watts || 0) * (dev.daily_usage_hours || 0)) / 1000;
      const standbyHours = Math.max(24 - (dev.daily_usage_hours || 0), 0);
      const standbyKwh = dev.is_standby ? ((dev.standby_watts || 0) * standbyHours) / 1000 : 0;
      const dailyKwh = runKwh + standbyKwh;
      return { ...dev, dailyKwh, monthlyKwh: dailyKwh * 30 };
    })
    .sort((a, b) => b.dailyKwh - a.dailyKwh);
  const totalDailyUsage = sortedByUsage.reduce((sum, d) => sum + d.dailyKwh, 0);
  const totalMonthlyUsage = totalDailyUsage * 30;

  // Calculate waste percentages from real device data
  const wasteDevices = dash?.devices?.filter((dev) => dev.waste_detected) || [];
  const totalWaste = wasteDevices.reduce((s, dev) => s + (dev.waste_kwh || 0), 0);
  const wastePcts = wasteDevices.length > 0
    ? wasteDevices.slice(0, 5).map((dev) => totalWaste > 0 ? Math.round(((dev.waste_kwh || 0) / totalWaste) * 100) : 0)
    : fallbackWastePcts;
  const wasteLabels = wasteDevices.length > 0
    ? wasteDevices.slice(0, 5).map((dev) => ({ sq: dev.name, en: dev.name }))
    : d.wasteLabels.map((w) => ({ sq: w.sq, en: w.en }));

  // Use real data or fallback
  const dashStats = [
    {
      icon: AlertTriangle,
      label: lang === "sq" ? "Pajisja që shpenzon më shumë" : "Highest-consuming device",
      value: sortedByUsage[0]?.name || (dash ? "N/A" : d.ac[lang]),
      accent: "text-destructive",
    },
    {
      icon: TrendingDown,
      label: lang === "sq" ? "Konsum ditor i pajisjeve" : "Daily device consumption",
      value: dash ? `${totalDailyUsage.toFixed(2)} kWh` : "1.9 kWh",
      accent: "text-primary",
    },
    {
      icon: DollarSign,
      label: lang === "sq" ? "Kosto mujore e pajisjeve" : "Monthly device cost",
      value: dash ? `€${(totalMonthlyUsage * 0.0805).toFixed(2)}` : "€12.80/mo",
      accent: "text-eco-success",
    },
    { icon: Award, label: d.energyScore[lang], value: dash ? `${dash.energyScore}/100` : "68/100", accent: "text-eco-blue" },
    { icon: Leaf, label: d.co2[lang], value: dash ? `${dash.co2Reduction} kg` : "15 kg", accent: "text-eco-teal" },
    { icon: Zap, label: d.wasteDetected[lang], value: dash ? `${dash.wasteKwh} kWh` : "4.1 kWh", accent: "text-eco-warning" },
  ];

  // Use real alerts/recommendations or fallback
  const generatedDeviceRecs = sortedByUsage.slice(0, 3).map((dev, idx) => {
    const priority = idx === 0 ? "high" : idx === 1 ? "medium" : "low";
    const textSq =
      idx === 0
        ? `${dev.name} po konsumon më së shumti (${dev.monthlyKwh.toFixed(1)} kWh/muaj). Ulni orët ditore ose aktivizoni modalitetin eco.`
        : idx === 1
          ? `${dev.name} ka konsum të lartë (${dev.dailyKwh.toFixed(2)} kWh/ditë). Kontrolloni orarin e përdorimit.`
          : `${dev.name} mund të optimizohet duke fikur standby-n kur nuk përdoret.`;
    const textEn =
      idx === 0
        ? `${dev.name} is your biggest consumer (${dev.monthlyKwh.toFixed(1)} kWh/month). Reduce daily hours or enable eco mode.`
        : idx === 1
          ? `${dev.name} has high usage (${dev.dailyKwh.toFixed(2)} kWh/day). Review operating schedule.`
          : `${dev.name} can be optimized by turning off standby when not in use.`;
    return { text: lang === "sq" ? textSq : textEn, impact: priority };
  });

  const displayRecs = recs.length > 0
    ? recs.map((r) => ({ text: lang === "sq" ? r.text_sq : r.text_en, impact: r.impact }))
    : generatedDeviceRecs.length > 0
      ? generatedDeviceRecs
    : d.recommendations.map((r) => ({ text: r.text[lang], impact: r.impact[lang] }));

  // Weekly chart from real records
  const records = dash?.records || [];
  const weeklyData = records.length > 0
    ? records.slice(-7).map((r) => ({ value: Math.round(((r.waste_kwh || 0) / (r.total_kwh || 1)) * 100), label: new Date(r.date).toLocaleDateString(lang === "sq" ? "sq" : "en", { weekday: "short" }) }))
    : [65, 45, 70, 50, 38, 55, 42].map((h, i) => ({ value: h, label: d.days[lang][i] }));

  return (
    <SectionWrapper id="demo">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{d.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{d.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{d.desc[lang]}</p>
        {!user && <p className="text-xs text-primary mt-2">{lang === "sq" ? "Kyçu për të parë të dhënat e tua" : "Sign in to see your data"}</p>}
      </div>

      {isLoading && user ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="glass-card p-6 md:p-8 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {dashStats.map((s, i) => (
              <div key={i} className="dashboard-panel">
                <s.icon className={`w-5 h-5 ${s.accent} mb-2`} />
                <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                <div className={`text-lg font-bold font-display ${s.accent}`}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">{d.aiRecommendations[lang]}</h3>
              <div className="space-y-3">
                {displayRecs.map((r, i) => {
                  const Icon = recIcons[i % recIcons.length];
                  return (
                    <div key={i} className={`notification-card transition-all duration-500 ${i === activeRec ? "border-primary/30 bg-primary/5" : ""}`}>
                      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === activeRec ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{r.text}</p>
                        <span className={`text-xs font-medium ${r.impact === "high" ? "text-destructive" : r.impact === "medium" ? "text-eco-warning" : "text-muted-foreground"}`}>
                          {r.impact === "high" ? (lang === "sq" ? "I lartë" : "High") : r.impact === "medium" ? (lang === "sq" ? "Mesatar" : "Medium") : (lang === "sq" ? "I ulët" : "Low")} {d.impactLabel[lang]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">
                {lang === "sq" ? "Pajisjet që shpenzojnë më së shumti" : "Top electricity consumers"}
              </h3>
              <div className="space-y-3 mb-5">
                {sortedByUsage.slice(0, 5).map((dev, i) => (
                  <div key={dev.id ?? i} className="p-3 rounded-xl border border-border/40 bg-muted/30">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{dev.name}</span>
                      <span className="text-muted-foreground">{dev.monthlyKwh.toFixed(1)} kWh/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lang === "sq" ? "Ditore" : "Daily"}: {dev.dailyKwh.toFixed(2)} kWh
                    </p>
                  </div>
                ))}
                {sortedByUsage.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    {lang === "sq"
                      ? "Shtoni pajisje në Smart Appliance Setup për të parë analizën."
                      : "Add devices in Smart Appliance Setup to see analysis."}
                  </p>
                )}
              </div>

              <h3 className="font-display font-semibold text-foreground mb-4">{d.topWaste[lang]}</h3>
              <div className="space-y-4">
                {wasteLabels.slice(0, 5).map((w, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{lang === "sq" ? w.sq : w.en}</span>
                      <span className="text-muted-foreground">{wastePcts[i]}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${wastePcts[i]}%`, background: "var(--gradient-primary)" }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 dashboard-panel">
                <div className="text-xs text-muted-foreground mb-3">{d.weeklyTrend[lang]}</div>
                <div className="flex items-end gap-2 h-24">
                  {weeklyData.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-md" style={{ height: `${item.value}%`, background: item.value > 60 ? "hsl(var(--destructive))" : "hsl(var(--primary))", opacity: 0.7 + i / 20 }} />
                      <span className="text-[10px] text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default DemoSection;
