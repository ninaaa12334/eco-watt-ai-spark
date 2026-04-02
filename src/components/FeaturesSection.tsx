import SectionWrapper from "./SectionWrapper";
import { Activity, Plug, Power, MessageSquare, BarChart3, Thermometer, TrendingUp, Award } from "lucide-react";

const features = [
  { icon: Activity, title: "Real-Time Energy Monitoring", desc: "Track every watt in real time across all connected devices and circuits." },
  { icon: Plug, title: "Charger & Standby Detection", desc: "Identifies chargers left plugged in and standby power drain automatically." },
  { icon: Power, title: "Smart Device Auto Shutoff", desc: "Automatically turns off devices when waste is detected via smart home integration." },
  { icon: MessageSquare, title: "Personalized Saving Advice", desc: "AI-generated tips tailored to your household's unique energy patterns." },
  { icon: BarChart3, title: "Appliance Efficiency Insights", desc: "Compare appliance efficiency and spot underperformers over time." },
  { icon: Thermometer, title: "Heating & Cooling Optimization", desc: "Smart scheduling and anomaly detection for HVAC systems." },
  { icon: TrendingUp, title: "Monthly Savings Prediction", desc: "Forecasts your potential savings based on current behavior and optimizations." },
  { icon: Award, title: "Home Energy Score", desc: "A dynamic score rating your household's energy efficiency over time." },
];

const FeaturesSection = () => (
  <SectionWrapper id="features" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
        Everything You Need to Save Energy
      </h2>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {features.map((f, i) => (
        <div key={i} className="feature-card group">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
            <f.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default FeaturesSection;
