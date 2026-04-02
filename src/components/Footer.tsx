import { Zap, Github, Twitter, Linkedin, Globe } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-12 px-4 md:px-8">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2 font-display font-bold text-lg">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="gradient-text">EcoWatt</span>
        <span className="text-foreground">AI Web</span>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Supporting SDG 7: Affordable and Clean Energy</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Built for a sustainability-focused AI hackathon</p>
      </div>
      <div className="flex items-center gap-4">
        {[Github, Twitter, Linkedin, Globe].map((Icon, i) => (
          <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
