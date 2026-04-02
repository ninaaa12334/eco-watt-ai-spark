import { motion } from "framer-motion";
import { Zap, TrendingDown, DollarSign, Shield, Camera, FileText } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: "var(--gradient-hero)" }}>
    <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "hsl(var(--eco-emerald))" }} />
    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "hsl(var(--eco-blue))" }} />

    <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-primary/20 bg-primary/5 text-primary">
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Energy Intelligence
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
          <span className="gradient-text">Smarter homes,</span>
          <br />
          <span className="gradient-text">lower bills,</span>
          <br />
          <span className="text-foreground">no expensive hardware.</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
          EcoWatt AI Web helps households understand where electricity is being wasted by analyzing appliances, habits, and bills — then turning that into personalized savings recommendations and bill verification insights.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <a href="#demo" className="btn-primary-eco"><Zap className="w-4 h-4" /> Try Demo</a>
          <a href="#how-it-works" className="btn-outline-eco">See How It Works</a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: TrendingDown, value: 18, suffix: "%", label: "Less wasted electricity" },
            { icon: DollarSign, prefix: "€", value: 14, label: "Avg. monthly savings" },
            { icon: Shield, value: 94, suffix: "%", label: "Bill accuracy check" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }} className="text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <div className="text-2xl md:text-3xl font-bold font-display text-foreground">
                <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
        <div className="glass-card p-6 rounded-2xl animate-float">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">AI Analysis Dashboard</h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">Live</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Waste Found", value: "3.2 kWh", color: "bg-destructive/10 text-destructive" },
              { label: "Potential Savings", value: "€9.40", color: "bg-eco-success/10 text-eco-success" },
              { label: "Energy Score", value: "78/100", color: "bg-primary/10 text-primary" },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl p-3 ${item.color}`}>
                <div className="text-xs opacity-80 mb-1">{item.label}</div>
                <div className="text-lg font-bold font-display">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            {[
              { name: "Upload Bill Photo", icon: Camera, status: "ready" },
              { name: "Scan Appliances", icon: Camera, status: "ready" },
              { name: "Bill Verification", icon: FileText, status: "active" },
            ].map((d) => (
              <div key={d.name} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2.5">
                  <d.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{d.name}</span>
                </div>
                <span className={`w-2 h-2 rounded-full ${d.status === "active" ? "bg-eco-success" : "bg-primary"}`} />
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl border border-eco-warning/30 bg-eco-warning/5 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-eco-warning mt-0.5 flex-shrink-0" />
            <div className="text-xs text-foreground">
              <span className="font-semibold">AI Insight:</span> Your bill shows 18% higher daytime usage than expected. Possible tariff issue detected.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
