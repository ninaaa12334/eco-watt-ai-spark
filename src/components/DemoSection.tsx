import { useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import {
  Zap, Battery, AlertTriangle, DollarSign, Leaf, Award,
  Power, Clock, Thermometer, Lightbulb, Bell,
  ToggleRight, Plug, Tv
} from "lucide-react";

const dashStats = [
  { icon: Zap, label: "Today's Usage", value: "12.4 kWh", accent: "text-primary" },
  { icon: Battery, label: "Active Devices", value: "7", accent: "text-secondary" },
  { icon: AlertTriangle, label: "Waste Detected", value: "1.8 kWh", accent: "text-destructive" },
  { icon: DollarSign, label: "Monthly Savings", value: "€14.30", accent: "text-eco-success" },
  { icon: Leaf, label: "CO₂ Reduced", value: "21 kg", accent: "text-eco-teal" },
  { icon: Award, label: "Energy Score", value: "82/100", accent: "text-eco-blue" },
];

const notifications = [
  { icon: Plug, text: "Phone charger has been plugged in for 6 hours after full charge.", time: "2 min ago" },
  { icon: Tv, text: "TV standby usage detected overnight in the living room.", time: "18 min ago" },
  { icon: Lightbulb, text: "Kitchen lights remained on for 95 minutes without movement.", time: "34 min ago" },
  { icon: Thermometer, text: "Air conditioner is running while the window is open.", time: "1 hr ago" },
  { icon: Zap, text: "Switching off idle devices now could save 11% this week.", time: "Just now" },
];

const smartActions = [
  { label: "Turn off standby devices", active: true },
  { label: "Schedule water heater", active: false },
  { label: "Reduce AC runtime", active: true },
  { label: "Notify when lights are left on", active: true },
  { label: "Activate Eco Mode", active: false },
];

const DemoSection = () => {
  const [activeNotif, setActiveNotif] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNotif((prev) => (prev + 1) % notifications.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper id="demo">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Live Demo</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
          The EcoWatt AI Dashboard
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          A real-time view of your home's energy intelligence — monitoring, detecting, and acting.
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
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" /> AI Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={`notification-card transition-all duration-500 ${
                    i === activeNotif ? "border-primary/30 bg-primary/5" : ""
                  }`}
                >
                  <n.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === activeNotif ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{n.text}</p>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <ToggleRight className="w-4 h-4 text-primary" /> Smart Actions
            </h3>
            <div className="space-y-3">
              {smartActions.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card">
                  <span className="text-sm font-medium text-foreground">{a.label}</span>
                  <div className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${
                    a.active ? "bg-primary" : "bg-muted"
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-card shadow absolute top-0.5 transition-all ${
                      a.active ? "left-5" : "left-0.5"
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 dashboard-panel">
              <div className="text-xs text-muted-foreground mb-3">Energy Usage — Last 7 Days</div>
              <div className="flex items-end gap-2 h-24">
                {[65, 45, 70, 50, 38, 55, 42].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-md transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        background: h > 60 ? "hsl(var(--destructive))" : "hsl(var(--primary))",
                        opacity: 0.7 + (i / 20),
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
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
