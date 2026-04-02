import SectionWrapper from "./SectionWrapper";
import AnimatedCounter from "./AnimatedCounter";
import { Zap, DollarSign, TrendingDown, Leaf } from "lucide-react";

const metrics = [
  { icon: Zap, value: 42, suffix: " kWh", label: "Estimated savings this month", color: "text-primary" },
  { icon: DollarSign, value: 14.3, suffix: "", prefix: "€", label: "Money saved", color: "text-eco-success", decimals: 1 },
  { icon: TrendingDown, value: 9, suffix: "%", label: "Lower electricity waste", color: "text-secondary" },
  { icon: Leaf, value: 21, suffix: " kg", label: "CO₂ avoided", color: "text-eco-teal" },
];

const ImpactSection = () => (
  <SectionWrapper id="impact">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Impact</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">How EcoWatt AI Web Creates Value</h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, i) => (
        <div key={i} className="glass-card p-8 text-center group hover:eco-glow transition-all duration-300">
          <m.icon className={`w-8 h-8 ${m.color} mx-auto mb-4`} />
          <div className={`text-4xl font-bold font-display ${m.color} mb-2`}>
            <AnimatedCounter end={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
          </div>
          <p className="text-sm text-muted-foreground">{m.label}</p>
          <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((m.value / 50) * 100, 100)}%`, background: "var(--gradient-primary)" }} />
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default ImpactSection;
