import SectionWrapper from "./SectionWrapper";
import { Shield, Eye, UserCheck, Lock, Settings } from "lucide-react";

const principles = [
  { icon: Shield, title: "Support & Automation", desc: "The AI acts as a support tool — augmenting decisions, not replacing them." },
  { icon: UserCheck, title: "User Control", desc: "Users stay in control of all automation and can override any AI decision." },
  { icon: Eye, title: "Transparent Recommendations", desc: "All suggestions are clear, explainable, and based on transparent logic." },
  { icon: Lock, title: "Privacy-Conscious", desc: "Minimal data collection with a privacy-first approach to household data." },
  { icon: Settings, title: "Customizable Automation", desc: "Automation can be manually approved, scheduled, or customized per device." },
];

const ResponsibleAISection = () => (
  <SectionWrapper id="responsible-ai">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Ethics</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
        Responsible and Transparent AI
      </h2>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {principles.map((p, i) => (
        <div key={i} className="feature-card text-center">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 mx-auto mb-4">
            <p.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-sm text-foreground mb-2">{p.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default ResponsibleAISection;
