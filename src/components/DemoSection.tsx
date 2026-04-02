import { useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { Zap, AlertTriangle, DollarSign, Leaf, Award, TrendingDown, Lightbulb, Thermometer, Plug, Tv } from "lucide-react";

const dashStats = [
  { icon: AlertTriangle, label: "Biggest Waste", value: "Air Conditioning", accent: "text-destructive" },
  { icon: TrendingDown, label: "Est. kWh Reduction", value: "38 kWh/mo", accent: "text-primary" },
  { icon: DollarSign, label: "Est. Savings", value: "€12.80/mo", accent: "text-eco-success" },
  { icon: Award, label: "Energy Score", value: "68/100", accent: "text-eco-blue" },
  { icon: Leaf, label: "CO₂ Reducible", value: "15 kg", accent: "text-eco-teal" },
  { icon: Zap, label: "Waste Detected", value: "4.1 kWh/day", accent: "text-eco-warning" },
];

const recommendations = [
  { icon: Thermometer, text: "Air conditioning is likely your largest electricity driver.", impact: "High" },
  { icon: Tv, text: "Two TVs appear to remain on standby overnight.", impact: "Medium" },
  { icon: Plug, text: "Chargers left plugged in daily may contribute to avoidable standby use.", impact: "Low" },
  { icon: Lightbulb, text: "Reducing AC use by 1 hour per day could save an estimated €6–€9 per month.", impact: "High" },
];

const topWaste = [
  { label: "Air conditioning", pct: 38 },
  { label: "Standby devices", pct: 22 },
  { label: "Lighting", pct: 15 },
  { label: "Water heater", pct: 14 },
  { label: "Other", pct: 11 },
];

const DemoSection = () => {
  const [activeRec, setActiveRec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveRec((p) => (p + 1) % recommendations.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper id="demo">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">AI Results</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Your AI Analysis Dashboard</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Here's what the AI discovers about your household's energy usage — personalized insights, waste detection, and actionable savings.
        </p>
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
            <h3 className="font-display font-semibold text-foreground mb-4">AI Recommendations</h3>
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <div key={i} className={`notification-card transition-all duration-500 ${i === activeRec ? "border-primary/30 bg-primary/5" : ""}`}>
                  <r.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === activeRec ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{r.text}</p>
                    <span className={`text-xs font-medium ${r.impact === "High" ? "text-destructive" : r.impact === "Medium" ? "text-eco-warning" : "text-muted-foreground"}`}>
                      {r.impact} impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Top Waste Sources</h3>
            <div className="space-y-4">
              {topWaste.map((w, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{w.label}</span>
                    <span className="text-muted-foreground">{w.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${w.pct}%`, background: "var(--gradient-primary)" }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 dashboard-panel">
              <div className="text-xs text-muted-foreground mb-3">Weekly Usage Trend</div>
              <div className="flex items-end gap-2 h-24">
                {[65, 45, 70, 50, 38, 55, 42].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-md" style={{ height: `${h}%`, background: h > 60 ? "hsl(var(--destructive))" : "hsl(var(--primary))", opacity: 0.7 + i / 20 }} />
                    <span className="text-[10px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
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
