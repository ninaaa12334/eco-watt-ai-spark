import SectionWrapper from "./SectionWrapper";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

const months = [
  { name: "Oct", kwh: 320, normal: true },
  { name: "Nov", kwh: 340, normal: true },
  { name: "Dec", kwh: 410, normal: false },
  { name: "Jan", kwh: 380, normal: true },
  { name: "Feb", kwh: 335, normal: true },
  { name: "Mar", kwh: 460, normal: false },
];

const maxKwh = 460;

const ConsumptionAnalyzer = () => (
  <SectionWrapper id="consumption-analyzer" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Trends</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Consumption Pattern Analyzer</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Using 3–6 months of bills, the AI detects unexpected changes and unusual day/night usage ratios compared to similar households.
      </p>
    </div>

    <div className="max-w-4xl mx-auto glass-card p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-primary" />
        <h3 className="font-display font-semibold text-foreground">6-Month Consumption Overview</h3>
      </div>

      <div className="flex items-end gap-4 h-48 mb-6">
        {months.map((m, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-medium text-foreground">{m.kwh}</div>
            <div
              className="w-full rounded-t-lg transition-all duration-700"
              style={{
                height: `${(m.kwh / maxKwh) * 100}%`,
                background: m.normal ? "hsl(var(--primary))" : "hsl(var(--destructive))",
                opacity: 0.8,
              }}
            />
            <span className="text-xs text-muted-foreground font-medium">{m.name}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
          <p className="text-sm text-foreground">December shows an abnormal 21% increase in consumption compared to the previous month.</p>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
          <p className="text-sm text-foreground">March usage is 35% above your 6-month average. The day/night ratio is unusual for this household type.</p>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-sm text-foreground">AI compares your patterns against typical usage for similar-sized households in your region.</p>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default ConsumptionAnalyzer;
