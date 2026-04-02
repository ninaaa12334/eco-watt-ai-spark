import SectionWrapper from "./SectionWrapper";
import { Bell, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

const alerts = [
  { icon: AlertTriangle, text: "This month's usage is 18% above your normal pattern", type: "warning", date: "March 2026" },
  { icon: TrendingUp, text: "Possible anomaly: high daytime usage during expensive tariff periods", type: "warning", date: "March 2026" },
  { icon: CheckCircle, text: "February bill looks normal based on your previous 4 months", type: "ok", date: "February 2026" },
  { icon: CheckCircle, text: "January consumption within expected range", type: "ok", date: "January 2026" },
];

const BillAnomalyAlerts = () => (
  <SectionWrapper id="anomaly-alerts">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Alerts</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Bill Anomaly Alerts</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Set your expected bill average. The system alerts you when usage exceeds normal thresholds so you can react quickly instead of discovering issues months later.
      </p>
    </div>

    <div className="max-w-3xl mx-auto">
      <div className="glass-card p-6 rounded-2xl mb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Alert Threshold</span>
          </div>
          <span className="text-sm font-bold text-primary font-display">€75/month</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "82%", background: "var(--gradient-primary)" }} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Current: €82.40</span>
          <span>Threshold: €75.00</span>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${a.type === "warning" ? "border-eco-warning/30 bg-eco-warning/5" : "border-eco-success/30 bg-eco-success/5"}`}>
            <a.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${a.type === "warning" ? "text-eco-warning" : "text-eco-success"}`} />
            <div className="flex-1">
              <p className="text-sm text-foreground">{a.text}</p>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default BillAnomalyAlerts;
