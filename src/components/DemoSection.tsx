import { useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Zap, AlertTriangle, DollarSign, Leaf, Award, TrendingDown, Lightbulb, Thermometer, Plug, Tv } from "lucide-react";

const recIcons = [Thermometer, Tv, Plug, Lightbulb];
const wastePcts = [38, 22, 15, 14, 11];

const DemoSection = () => {
  const { lang, t } = useLanguage();
  const d = t.demo;
  const [activeRec, setActiveRec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveRec((p) => (p + 1) % d.recommendations.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const dashStats = [
    { icon: AlertTriangle, label: d.biggestWaste[lang], value: d.ac[lang], accent: "text-destructive" },
    { icon: TrendingDown, label: d.kwhReduction[lang], value: "38 kWh/mo", accent: "text-primary" },
    { icon: DollarSign, label: d.savings[lang], value: "€12.80/mo", accent: "text-eco-success" },
    { icon: Award, label: d.energyScore[lang], value: "68/100", accent: "text-eco-blue" },
    { icon: Leaf, label: d.co2[lang], value: "15 kg", accent: "text-eco-teal" },
    { icon: Zap, label: d.wasteDetected[lang], value: "4.1 kWh", accent: "text-eco-warning" },
  ];

  return (
    <SectionWrapper id="demo">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{d.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{d.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{d.desc[lang]}</p>
      </div>

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
              {d.recommendations.map((r, i) => {
                const Icon = recIcons[i];
                return (
                  <div key={i} className={`notification-card transition-all duration-500 ${i === activeRec ? "border-primary/30 bg-primary/5" : ""}`}>
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === activeRec ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{r.text[lang]}</p>
                      <span className={`text-xs font-medium ${r.impact[lang] === (lang === "sq" ? "I lartë" : "High") ? "text-destructive" : r.impact[lang] === (lang === "sq" ? "Mesatar" : "Medium") ? "text-eco-warning" : "text-muted-foreground"}`}>
                        {r.impact[lang]} {d.impactLabel[lang]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">{d.topWaste[lang]}</h3>
            <div className="space-y-4">
              {d.wasteLabels.map((w, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{w[lang]}</span>
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
                {[65, 45, 70, 50, 38, 55, 42].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-md" style={{ height: `${h}%`, background: h > 60 ? "hsl(var(--destructive))" : "hsl(var(--primary))", opacity: 0.7 + i / 20 }} />
                    <span className="text-[10px] text-muted-foreground">{d.days[lang][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DemoSection;
