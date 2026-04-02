import SectionWrapper from "./SectionWrapper";
import { Shield, UserCheck, Eye, Lock, Camera, FileCheck } from "lucide-react";

const principles = [
  { icon: Shield, title: "Estimates, Not Perfection", desc: "The system provides estimates and recommendations, not perfect real-time monitoring." },
  { icon: UserCheck, title: "User Control", desc: "Users stay in control of all decisions and actions." },
  { icon: Lock, title: "Careful Data Handling", desc: "Data entered is handled carefully with minimal collection." },
  { icon: Camera, title: "Best-Effort Recognition", desc: "Photo recognition provides best-effort identification — users can review and correct." },
  { icon: Eye, title: "Transparent AI", desc: "The AI is designed to be practical, transparent, and accessible." },
  { icon: FileCheck, title: "Supportive, Not Official", desc: "Bill analysis supports users but does not replace official verification." },
];

const ResponsibleAISection = () => (
  <SectionWrapper id="responsible-ai">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Ethics</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Responsible AI</h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
