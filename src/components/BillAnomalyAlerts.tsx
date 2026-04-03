import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useBills } from "@/hooks/useEnergy";
import { Bell, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

const fallbackAlertIcons = [AlertTriangle, TrendingUp, CheckCircle, CheckCircle];

const BillAnomalyAlerts = () => {
  const { lang, t } = useLanguage();
  const a = t.anomaly;
  const { user } = useAuth();
  const { data: bills } = useBills();

  // Calculate from real bills or fallback
  const totalBills = bills || [];
  const avgBill = totalBills.length > 0
    ? totalBills.reduce((s, b) => s + (b.total_cost_eur || 0), 0) / totalBills.length
    : 75;
  const latestBill = totalBills.length > 0 ? totalBills[totalBills.length - 1] : null;
  const currentCost = latestBill?.total_cost_eur || 82.40;
  const threshold = Number(avgBill.toFixed(2));
  const pct = Math.min((currentCost / threshold) * 100, 120);

  // Generate alerts from real bill data
  const dynamicAlerts = totalBills.length > 0
    ? totalBills.filter((b) => b.is_anomaly).map((b) => ({
        text: { sq: `${b.month} ${b.year}: ${b.anomaly_reason || "Devijim i dyshimtë"}`, en: `${b.month} ${b.year}: ${b.anomaly_reason || "Suspicious deviation"}` },
        type: "warning" as const,
        date: { sq: `${b.month} ${b.year}`, en: `${b.month} ${b.year}` },
        icon: AlertTriangle,
      })).concat(
        totalBills.filter((b) => !b.is_anomaly).slice(-2).map((b) => ({
          text: { sq: `${b.month} ${b.year}: Fatura duket normale`, en: `${b.month} ${b.year}: Bill looks normal` },
          type: "ok" as const,
          date: { sq: `${b.month} ${b.year}`, en: `${b.month} ${b.year}` },
          icon: CheckCircle,
        }))
      ).slice(0, 4)
    : null;

  return (
    <SectionWrapper id="anomaly-alerts">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{a.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{a.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{a.desc[lang]}</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-foreground">{a.threshold[lang]}</span>
            </div>
            <span className="text-sm font-bold text-primary font-display">€{threshold}/{lang === "sq" ? "muaj" : "month"}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: pct > 100 ? "hsl(var(--destructive))" : "var(--gradient-primary)" }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{a.current[lang]}: €{currentCost.toFixed(2)}</span>
            <span>{a.threshold[lang]}: €{threshold.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-3">
          {dynamicAlerts ? (
            dynamicAlerts.map((al, i) => {
              const Icon = al.icon;
              return (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${al.type === "warning" ? "border-eco-warning/30 bg-eco-warning/5" : "border-eco-success/30 bg-eco-success/5"}`}>
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${al.type === "warning" ? "text-eco-warning" : "text-eco-success"}`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{al.text[lang]}</p>
                    <span className="text-xs text-muted-foreground">{al.date[lang]}</span>
                  </div>
                </div>
              );
            })
          ) : (
            a.alerts.map((al, i) => {
              const Icon = fallbackAlertIcons[i];
              return (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${al.type === "warning" ? "border-eco-warning/30 bg-eco-warning/5" : "border-eco-success/30 bg-eco-success/5"}`}>
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${al.type === "warning" ? "text-eco-warning" : "text-eco-success"}`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{al.text[lang]}</p>
                    <span className="text-xs text-muted-foreground">{al.date[lang]}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BillAnomalyAlerts;
