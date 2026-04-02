import SectionWrapper from "./SectionWrapper";
import { Database, Brain, Search, Zap } from "lucide-react";

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Data Input",
    desc: "Smart plugs, meters, occupancy sensors, time of day, weather data — all feeding into the system.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Analysis",
    desc: "Pattern recognition, anomaly detection, waste prediction, and appliance behavior insights.",
  },
  {
    icon: Search,
    step: "03",
    title: "Smart Decisions",
    desc: "Identifies unnecessary use, standby waste, and avoidable energy loss across your home.",
  },
  {
    icon: Zap,
    step: "04",
    title: "Action & Savings",
    desc: "Sends alerts, gives recommendations, estimates savings, and can auto-switch devices off.",
  },
];

const HowItWorksSection = () => (
  <SectionWrapper id="how-it-works">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Process</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">How It Works</h2>
    </div>

    <div className="grid md:grid-cols-4 gap-6 relative">
      {/* connector line */}
      <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

      {steps.map((s, i) => (
        <div key={i} className="relative text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-primary/10 relative z-10">
            <s.icon className="w-7 h-7 text-primary" />
          </div>
          <span className="text-xs font-bold text-primary/50 font-display">{s.step}</span>
          <h3 className="font-display font-semibold text-foreground mt-1 mb-2">{s.title}</h3>
          <p className="text-sm text-muted-foreground">{s.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default HowItWorksSection;
