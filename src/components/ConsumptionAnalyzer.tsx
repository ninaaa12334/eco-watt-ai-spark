import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useBills } from "@/hooks/useEnergy";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

const fallbackMonths = [
  { name: "Oct", kwh: 320, normal: true },
  { name: "Nov", kwh: 340, normal: true },
  { name: "Dec", kwh: 410, normal: false },
  { name: "Jan", kwh: 380, normal: true },
  { name: "Feb", kwh: 335, normal: true },
  { name: "Mar", kwh: 460, normal: false },
];

const ConsumptionAnalyzer = () => {
  const { lang, t } = useLanguage();
  const c = t.consumption;
  const { user } = useAuth();
  const { data: bills } = useBills();

  const months = bills && bills.length > 0
    ? bills.map((b) => ({
        name: b.month,
        kwh: b.total_kwh || 0,
        normal: !b.is_anomaly,
      }))
    : fallbackMonths;

  const maxKwh = Math.max(...months.map((m) => m.kwh));
  const anomalies = months.filter((m) => !m.normal);
  const anomalyBills = bills?.filter((b) => b.is_anomaly) || [];

  return (
    <SectionWrapper id="consumption-analyzer" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{c.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{c.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{c.desc[lang]}</p>
      </div>

      <div className="max-w-4xl mx-auto glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h3 className="font-display font-semibold text-foreground">{c.chartTitle[lang]}</h3>
        </div>

        <div className="flex items-end gap-4 h-48 mb-6">
          {months.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-medium text-foreground">{Math.round(m.kwh)}</div>
              <div className="w-full rounded-t-lg transition-all duration-700" style={{ height: `${(m.kwh / maxKwh) * 100}%`, background: m.normal ? "hsl(var(--primary))" : "hsl(var(--destructive))", opacity: 0.8 }} />
              <span className="text-xs text-muted-foreground font-medium">{m.name}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {anomalyBills.length > 0 ? (
            anomalyBills.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                <p className="text-sm text-foreground">
                  {lang === "sq"
                    ? `${b.month} ${b.year}: ${b.anomaly_reason || "Rritje e pazakontë në konsum"}`
                    : `${b.month} ${b.year}: ${b.anomaly_reason || "Abnormal increase in consumption"}`}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                <p className="text-sm text-foreground">{c.alert1[lang]}</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                <p className="text-sm text-foreground">{c.alert2[lang]}</p>
              </div>
            </>
          )}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
            <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
            <p className="text-sm text-foreground">{c.comparison[lang]}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ConsumptionAnalyzer;
