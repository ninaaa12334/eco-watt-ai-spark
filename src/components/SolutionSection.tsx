import SectionWrapper from "./SectionWrapper";
import { Brain, FileSearch, ListChecks } from "lucide-react";

const approaches = [
  { icon: Brain, title: "AI Waste Analyzer", desc: "Enter your household details and the AI estimates where electricity is most likely being wasted.", color: "bg-primary/10 text-primary" },
  { icon: FileSearch, title: "Bill Verification", desc: "Upload your bills and the AI detects anomalies, verifies tariff patterns, and flags suspicious charges.", color: "bg-secondary/10 text-secondary" },
  { icon: ListChecks, title: "Personalized Action Plan", desc: "Get ranked recommendations, savings estimates, and complaint tools — all without hardware.", color: "bg-eco-warning/10 text-eco-warning" },
];

const SolutionSection = () => (
  <SectionWrapper id="solution" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">The Solution</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">The Solution</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        EcoWatt AI Web is an AI-powered electricity waste analyzer and bill verification platform. Users enter basic household info, and the AI estimates waste sources, detects bill anomalies, verifies tariffs, and delivers a personalized action plan.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {approaches.map((a, i) => (
        <div key={i} className="glass-card p-8 text-center group hover:eco-glow transition-all duration-300">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${a.color}`}>
            <a.icon className="w-7 h-7" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">{a.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default SolutionSection;
