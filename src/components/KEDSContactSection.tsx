import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Phone, Mail, MapPin, Clock, Sun, Moon, Zap } from "lucide-react";

const KEDSContactSection = () => {
  const { lang, t } = useLanguage();
  const k = t.keds;

  return (
    <SectionWrapper id="keds-contact" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{k.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{k.contactTitle[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{k.contactDesc[lang]}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> KEDS / KESCO
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">{k.phone[lang]}</div>
                <div className="text-lg font-bold font-display text-foreground">0800 791 00</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/5 border border-secondary/10">
              <Mail className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">{k.email[lang]}</div>
                <div className="text-sm font-semibold text-foreground">info@keds-energy.com</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <MapPin className="w-5 h-5 text-eco-teal mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">{k.office[lang]}</div>
                <div className="text-sm font-medium text-foreground">{k.officeAddress[lang]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tariff Info */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">{k.tariffTitle[lang]}</h3>
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">{k.tariffDesc[lang]}</p>

          <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
            <span className="text-sm text-foreground font-medium">{k.fixedFee[lang]}</span>
            <span className="text-lg font-bold font-display text-primary">2.32 €</span>
          </div>

          {/* Dual meter */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sun className="w-4 h-4 text-eco-warning" />
              <Moon className="w-4 h-4 text-secondary" />
              {k.dualMeter[lang]}
            </h4>
            <div className="overflow-hidden rounded-xl border border-border/50">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-2.5 text-muted-foreground font-medium"></th>
                    <th className="text-center p-2.5 text-eco-warning font-semibold">{k.day[lang]}</th>
                    <th className="text-center p-2.5 text-secondary font-semibold">{k.night[lang]}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/30">
                    <td className="p-2.5 text-foreground font-medium">{k.block1[lang]}</td>
                    <td className="p-2.5 text-center font-mono font-semibold text-foreground">9.05 c/kWh</td>
                    <td className="p-2.5 text-center font-mono font-semibold text-foreground">3.88 c/kWh</td>
                  </tr>
                  <tr className="border-t border-border/30 bg-muted/30">
                    <td className="p-2.5 text-foreground font-medium">{k.block2[lang]}</td>
                    <td className="p-2.5 text-center font-mono font-semibold text-foreground">15.43 c/kWh</td>
                    <td className="p-2.5 text-center font-mono font-semibold text-foreground">7.28 c/kWh</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Single meter */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">{k.singleMeter[lang]}</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-muted/50 text-center">
                <div className="text-xs text-muted-foreground">{k.block1[lang]}</div>
                <div className="font-mono font-semibold text-sm text-foreground mt-1">7.12 c/kWh</div>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/50 text-center">
                <div className="text-xs text-muted-foreground">{k.block2[lang]}</div>
                <div className="font-mono font-semibold text-sm text-foreground mt-1">12.39 c/kWh</div>
              </div>
            </div>
          </div>

          {/* Peak hours */}
          <div className="p-3 rounded-xl border border-eco-warning/20 bg-eco-warning/5">
            <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-eco-warning" />
              {k.peakHours[lang]}
            </h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>❄️ {k.winter[lang]}</p>
              <p>☀️ {k.summer[lang]}</p>
              <p className="text-xs italic mt-2">{k.offPeak[lang]}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default KEDSContactSection;
