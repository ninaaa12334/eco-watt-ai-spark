import SectionWrapper from "./SectionWrapper";
import { DollarSign, Leaf, Heart, TrendingDown, Wifi, Shield } from "lucide-react";

const reasons = [
  { icon: DollarSign, title: "Lower electricity bills", desc: "Identify and eliminate hidden waste to reduce monthly costs." },
  { icon: Leaf, title: "Reduce unnecessary energy use", desc: "Cut consumption that serves no purpose in your daily life." },
  { icon: Heart, title: "Accessible sustainability", desc: "Make sustainable living practical for every household." },
  { icon: TrendingDown, title: "Better energy habits", desc: "Build awareness of daily habits that drive consumption." },
  { icon: Wifi, title: "No expensive hardware", desc: "A low-cost alternative to sensor-based smart home systems." },
  { icon: Shield, title: "Bill confidence", desc: "Give users more confidence about their bills and meter behavior." },
];

const WhyItMattersSection = () => (
  <SectionWrapper id="why-it-matters">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Value</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Why It Matters</h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {reasons.map((r, i) => (
        <div key={i} className="glass-card p-7 group hover:eco-glow transition-all duration-300">
          <r.icon className="w-7 h-7 text-primary mb-4" />
          <h3 className="font-display font-semibold text-foreground mb-2">{r.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default WhyItMattersSection;
