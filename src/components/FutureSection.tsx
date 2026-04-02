import SectionWrapper from "./SectionWrapper";
import { Sun, Users, Smartphone, Mic, Gauge, GraduationCap } from "lucide-react";

const visions = [
  { icon: Sun, title: "Solar Panel Integration", desc: "Combine solar generation data with consumption for full energy visibility." },
  { icon: Users, title: "Neighborhood Comparisons", desc: "Compare energy efficiency with similar households nearby." },
  { icon: Smartphone, title: "Mobile App Controls", desc: "Full remote control and monitoring from your phone." },
  { icon: Mic, title: "Voice Assistant", desc: "Ask your voice assistant about energy status and controls." },
  { icon: Gauge, title: "Smart Meter Partners", desc: "Direct integration with utility smart meters." },
  { icon: GraduationCap, title: "Community Challenges", desc: "School and neighborhood energy-saving competitions." },
];

const FutureSection = () => (
  <SectionWrapper id="future" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Roadmap</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">What Comes Next</h2>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {visions.map((v, i) => (
        <div key={i} className="feature-card flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-secondary/10">
            <v.icon className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground mb-1">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default FutureSection;
