import SectionWrapper from "./SectionWrapper";
import { BatteryWarning, Tv, Lightbulb, Thermometer, Moon, Plug } from "lucide-react";

const problems = [
  { icon: Plug, title: "Chargers left plugged in", desc: "Devices keep drawing power even after full charge" },
  { icon: Tv, title: "TVs & consoles on standby", desc: "Always-on modes waste electricity around the clock" },
  { icon: Lightbulb, title: "Lights left on", desc: "Empty rooms with lights burning for hours" },
  { icon: BatteryWarning, title: "Inefficient appliances", desc: "Older or misconfigured devices waste energy" },
  { icon: Thermometer, title: "Unnecessary heating/cooling", desc: "HVAC running with windows open or rooms empty" },
  { icon: Moon, title: "Overnight consumption", desc: "Devices consuming power while everyone sleeps" },
];

const ProblemSection = () => (
  <SectionWrapper id="problem">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-destructive">The Problem</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
        Electricity Waste Happens Silently
      </h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Households often waste electricity without noticing — increasing bills and contributing to unnecessary environmental impact.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {problems.map((p, i) => (
        <div key={i} className="feature-card flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-destructive/10">
            <p.icon className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground mb-1">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default ProblemSection;
