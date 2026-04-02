import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Gauge, Upload, Smartphone, Users, GraduationCap, Wifi, Building } from "lucide-react";

const icons = [Gauge, Upload, Smartphone, Users, GraduationCap, Wifi, Building];

const FutureSection = () => {
  const { lang, t } = useLanguage();
  const f = t.future;

  return (
    <SectionWrapper id="future" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{f.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{f.title[lang]}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {f.items.map((v, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="feature-card flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-secondary/10">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{v.title[lang]}</h3>
                <p className="text-sm text-muted-foreground">{v.desc[lang]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default FutureSection;
