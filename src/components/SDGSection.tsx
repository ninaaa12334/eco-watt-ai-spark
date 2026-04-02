import SectionWrapper from "./SectionWrapper";
import { Sun } from "lucide-react";

const SDGSection = () => (
  <SectionWrapper id="sdg" className="bg-muted/30">
    <div className="max-w-3xl mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--gradient-primary)" }}>
        <Sun className="w-8 h-8 text-primary-foreground" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">SDG 7</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-5 text-foreground">
        Built for SDG 7: Affordable and Clean Energy
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        EcoWatt AI directly supports Sustainable Development Goal 7 by improving household energy efficiency,
        reducing unnecessary electricity waste, and helping families use energy more responsibly — making
        clean, affordable energy accessible to everyone.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          "Improve energy efficiency",
          "Reduce electricity waste",
          "Promote responsible usage",
        ].map((item, i) => (
          <div key={i} className="glass-card p-5 text-sm font-medium text-foreground">
            {item}
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default SDGSection;
