import SectionWrapper from "./SectionWrapper";
import { Thermometer, Tv, Plug, Lightbulb, HelpCircle, DollarSign, Moon, Gauge } from "lucide-react";

const problems = [
  { icon: Thermometer, title: "AC & heating overuse", desc: "Running heating or cooling longer than needed without realizing the waste" },
  { icon: Tv, title: "Devices on standby", desc: "TVs and consoles drawing power around the clock in standby mode" },
  { icon: Plug, title: "Chargers left plugged in", desc: "Phone and laptop chargers keep drawing power even after full charge" },
  { icon: Lightbulb, title: "Inefficient habits", desc: "Lights left on, appliances running unnecessarily throughout the day" },
  { icon: HelpCircle, title: "No bill clarity", desc: "Most people can't tell what's actually driving their electricity bill up" },
  { icon: DollarSign, title: "Suspected abnormal bills", desc: "Users may suspect billing issues but have no way to verify them" },
  { icon: Moon, title: "Tariff switching issues", desc: "Day/night tariffs may not switch correctly, leading to higher charges" },
  { icon: Gauge, title: "Hardware costs", desc: "Smart plugs and sensors are expensive, making monitoring unrealistic for many" },
];

const ProblemSection = () => (
  <SectionWrapper id="problem">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-destructive">The Problem</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">The Problem</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Many households have high electricity bills but don't know which appliances or habits cause the most waste. Verifying bills and tariff behavior is nearly impossible without expensive tools.
      </p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
