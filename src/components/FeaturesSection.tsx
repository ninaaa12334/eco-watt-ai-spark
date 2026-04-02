import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Search, BarChart3, DollarSign, Award, ListChecks, Wifi,
  ClipboardList, Camera, FileSearch, Moon, TrendingUp, MapPin, FileText, Bell
} from "lucide-react";

const icons = [Search, BarChart3, DollarSign, Award, ListChecks, Wifi, ClipboardList, Camera, FileSearch, Moon, TrendingUp, MapPin, FileText, Bell];

const FeaturesSection = () => {
  const { lang, t } = useLanguage();
  const f = t.features;

  return (
    <SectionWrapper id="features" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{f.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{f.title[lang]}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {f.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="feature-card group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title[lang]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc[lang]}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default FeaturesSection;
