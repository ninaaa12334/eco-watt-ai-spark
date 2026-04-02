import SectionWrapper from "./SectionWrapper";
import { Tv, Thermometer, Plug, Moon, DollarSign, Home, Users, Upload, Camera } from "lucide-react";

const inputs = [
  { icon: Tv, label: "Number of TVs", placeholder: "2" },
  { icon: Thermometer, label: "AC/heating hours per day", placeholder: "6" },
  { icon: Plug, label: "Number of chargers", placeholder: "4" },
  { icon: Moon, label: "Devices on standby overnight?", placeholder: "Yes" },
  { icon: DollarSign, label: "Monthly electricity bill (€)", placeholder: "85" },
  { icon: Home, label: "Home size (m²)", placeholder: "90" },
  { icon: Users, label: "Household members", placeholder: "4" },
];

const SmartInputSection = () => (
  <SectionWrapper id="smart-input">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Input</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Tell Us About Your Home</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Answer a few simple questions and upload your bill or device photos — the AI handles the rest.
      </p>
    </div>

    <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {inputs.map((inp, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card">
            <inp.icon className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1">{inp.label}</div>
              <div className="text-sm font-medium text-foreground">{inp.placeholder}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-5 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 cursor-pointer hover:border-primary/50 transition-colors">
          <Upload className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm font-semibold text-foreground">Upload Bill</div>
            <div className="text-xs text-muted-foreground">PDF or photo of your electricity bill</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-5 rounded-xl border-2 border-dashed border-secondary/30 bg-secondary/5 cursor-pointer hover:border-secondary/50 transition-colors">
          <Camera className="w-5 h-5 text-secondary" />
          <div>
            <div className="text-sm font-semibold text-foreground">Upload Device Photo</div>
            <div className="text-xs text-muted-foreground">AI identifies your appliance</div>
          </div>
        </div>
      </div>

      <button className="btn-primary-eco w-full mt-6">Analyze My Home</button>
    </div>
  </SectionWrapper>
);

export default SmartInputSection;
