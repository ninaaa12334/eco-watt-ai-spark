import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { DollarSign, Leaf, Heart, TrendingDown, Wifi, Shield } from "lucide-react";

const icons = [DollarSign, Leaf, Heart, TrendingDown, Wifi, Shield];

const WhyItMattersSection = () => {
  const { lang, t } = useLanguage();
  const w = t.whyItMatters;

  return (
    <SectionWrapper id="why-it-matters">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{w.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{w.title[lang]}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {w.items.map((r, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="glass-card p-7 group hover:eco-glow transition-all duration-300">
              <Icon className="w-7 h-7 text-primary mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{r.title[lang]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc[lang]}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default WhyItMattersSection;
