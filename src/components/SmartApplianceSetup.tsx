import SectionWrapper from "./SectionWrapper";
import { Camera, PenLine, Tv, Wind, Refrigerator, Smartphone, CheckCircle } from "lucide-react";

const detections = [
  { text: "Samsung TV detected from uploaded image", icon: Tv },
  { text: "Split AC unit recognized — added to cooling devices", icon: Wind },
  { text: "Phone charger identified as low-power daily-use device", icon: Smartphone },
];

const SmartApplianceSetup = () => (
  <SectionWrapper id="appliance-setup" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Onboarding</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Smart Appliance Setup</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        After signing up, create your household energy profile. Add appliances manually or snap a photo and let AI identify them for you.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      {/* Manual Entry */}
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10">
            <PenLine className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Manual Device Entry</h3>
        </div>
        <div className="space-y-3">
          {["Device type (TV, AC, fridge, heater…)", "Brand & model", "Quantity & estimated daily usage", "Standby behavior", "Room / location"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="w-4 h-4 text-eco-success flex-shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo-based */}
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-secondary/10">
            <Camera className="w-5 h-5 text-secondary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Photo-Based Device Input</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Take a photo or upload an image of your appliance. AI identifies the device type, brand, and category — you confirm or edit before saving.
        </p>
        <div className="space-y-3">
          {detections.map((d, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5">
              <d.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default SmartApplianceSetup;
