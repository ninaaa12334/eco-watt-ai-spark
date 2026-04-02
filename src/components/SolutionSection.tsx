import SectionWrapper from "./SectionWrapper";
import { Bell, Brain, Settings } from "lucide-react";

const approaches = [
  { icon: Bell, title: "Alerts Users", desc: "Sends real-time notifications about wasteful patterns and anomalies detected in your home.", color: "bg-eco-warning/10 text-eco-warning" },
  { icon: Brain, title: "Suggests Actions", desc: "Provides personalized, data-driven recommendations to reduce consumption based on your habits.", color: "bg-secondary/10 text-secondary" },
  { icon: Settings, title: "Automates Controls", desc: "Connects to smart devices to automatically turn off waste and optimize energy schedules.", color: "bg-primary/10 text-primary" },
];

const SolutionSection = () => (
  <SectionWrapper id="solution" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">The Solution</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
        An AI Assistant That Thinks Like<br />an Energy Manager
      </h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        EcoWatt AI continuously analyzes household behavior and energy patterns, detects inefficient use, and responds intelligently.
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
