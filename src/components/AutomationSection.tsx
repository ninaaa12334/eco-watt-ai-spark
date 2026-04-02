import SectionWrapper from "./SectionWrapper";
import { Lightbulb, Power, Plug, Clock, Leaf } from "lucide-react";

const automations = [
  { icon: Lightbulb, text: "Turns off unused lights when rooms are empty" },
  { icon: Power, text: "Disables unnecessary standby power automatically" },
  { icon: Plug, text: "Reminds users to unplug fully charged devices" },
  { icon: Clock, text: "Adjusts appliance schedules for off-peak hours" },
  { icon: Leaf, text: "Activates energy-saving mode during low-usage periods" },
];

const AutomationSection = () => (
  <SectionWrapper id="automation" className="bg-muted/30">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Automation</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">
          From Advice to Action
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          EcoWatt AI doesn't only suggest improvements — it can also automate energy-saving actions when connected to compatible smart home systems.
        </p>

        <div className="space-y-4">
          {automations.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-primary/10">
                <a.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-display font-semibold text-foreground mb-4">Automation Log</h3>
        <div className="space-y-3">
          {[
            { time: "08:12", action: "Eco Mode activated — morning low-usage period", saved: "0.4 kWh" },
            { time: "09:45", action: "Living room lights turned off — no occupancy", saved: "0.08 kWh" },
            { time: "11:30", action: "Phone charger disconnected after full charge", saved: "0.02 kWh" },
            { time: "14:20", action: "AC adjusted — window detected open", saved: "0.9 kWh" },
            { time: "22:00", action: "All standby devices switched off — nighttime", saved: "0.15 kWh" },
          ].map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-xs font-mono text-primary font-semibold mt-0.5">{log.time}</span>
              <div className="flex-1">
                <p className="text-sm text-foreground">{log.action}</p>
                <span className="text-xs text-eco-success font-medium">Saved {log.saved}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default AutomationSection;
