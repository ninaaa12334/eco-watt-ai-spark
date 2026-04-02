import SectionWrapper from "./SectionWrapper";
import { Gauge, Upload, Smartphone, Users, GraduationCap, Wifi, Building } from "lucide-react";

const visions = [
  { icon: Gauge, title: "Smart Meter Integration", desc: "Optional integration with smart meters for enhanced accuracy." },
  { icon: Upload, title: "Bill Analysis at Scale", desc: "Utility bill upload analysis for large-scale insights." },
  { icon: Smartphone, title: "Mobile App", desc: "Full mobile app for on-the-go energy management." },
  { icon: Users, title: "Local Comparisons", desc: "Compare energy savings with similar households locally." },
  { icon: GraduationCap, title: "Community Programs", desc: "School and neighborhood energy awareness challenges." },
  { icon: Wifi, title: "Smart Home Integration", desc: "Future integration with smart home devices for automation." },
  { icon: Building, title: "City Dashboards", desc: "City-level reporting and energy efficiency dashboards." },
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
