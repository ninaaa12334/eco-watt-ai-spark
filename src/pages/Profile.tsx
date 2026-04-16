
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useHousehold } from "@/hooks/useHousehold";
import { useDashboard } from "@/hooks/useEnergy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Home, Zap, Users, MapPin, Calendar, Settings, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoSection from "@/components/DemoSection";
import BillCheckerSection from "@/components/BillCheckerSection";
import BillAnomalyAlerts from "@/components/BillAnomalyAlerts";
import ImpactSection from "@/components/ImpactSection";
import SmartApplianceSetup from "@/components/SmartApplianceSetup";

const Profile = () => {
  const { user } = useAuth();
  const { householdId } = useHousehold();
  const { data: dashboard, isLoading } = useDashboard();
  const { lang, t } = useLanguage();
  const [showComplaintTool, setShowComplaintTool] = useState(false);
  const [complaintInput, setComplaintInput] = useState("");

  const topWasteDevices =
    dashboard?.devices
      ?.filter((d) => (d.waste_kwh || 0) > 0)
      .sort((a, b) => (b.waste_kwh || 0) - (a.waste_kwh || 0))
      .slice(0, 3) || [];

  const recommendations = dashboard?.recommendations || [];


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            {lang === "sq" ? "Profili Im" : "My Profile"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "sq" ? "Menaxhoni informacionin tuaj dhe të shtëpisë" : "Manage your information and household data"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Info Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {lang === "sq" ? "Informacionet Personale" : "Personal Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {lang === "sq" ? "Email" : "Email"}
                </label>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {lang === "sq" ? "ID e Përdoruesit" : "User ID"}
                </label>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{user.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {lang === "sq" ? "Data e Regjistrimit" : "Registration Date"}
                </label>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Household Info Card */}
          {householdId && dashboard && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  {lang === "sq" ? "Shtëpia" : "Household"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {lang === "sq" ? "Emri" : "Name"}
                  </label>
                  <p>{dashboard.household?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {lang === "sq" ? "Qyteti" : "City"}
                  </label>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {dashboard.household?.city || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {lang === "sq" ? "Anëtarët" : "Members"}
                  </label>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {dashboard.household?.num_members || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {lang === "sq" ? "Sipërfaqja" : "Size"}
                  </label>
                  <p>{dashboard.household?.home_size_m2 || "N/A"} m²</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {lang === "sq" ? "Fatura Mujore" : "Monthly Bill"}
                  </label>
                  <p className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    €{dashboard.household?.monthly_bill_avg || "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Energy Score Card */}
          {dashboard && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {lang === "sq" ? "Rezultati i Energjisë" : "Energy Score"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {dashboard.household?.energy_score || 0}/100
                  </div>
                  <Badge variant={dashboard.household?.energy_score >= 70 ? "default" : dashboard.household?.energy_score >= 50 ? "secondary" : "destructive"}>
                    {dashboard.household?.energy_score >= 70 ? (lang === "sq" ? "Shkëlqyeshëm" : "Excellent") :
                     dashboard.household?.energy_score >= 50 ? (lang === "sq" ? "Mirë" : "Good") :
                     (lang === "sq" ? "Nevojë për përmirësim" : "Needs Improvement")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          {dashboard && (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>{lang === "sq" ? "Statistikat e Shpejta" : "Quick Stats"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{dashboard.devices?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">
                      {lang === "sq" ? "Pajisje" : "Devices"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{dashboard.alerts?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">
                      {lang === "sq" ? "Sinjalizime" : "Alerts"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{dashboard.recommendations?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">
                      {lang === "sq" ? "Rekomandime" : "Recommendations"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {dashboard.household?.eco_mode_active ? (lang === "sq" ? "Aktiv" : "Active") : (lang === "sq" ? "Joaktiv" : "Inactive")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lang === "sq" ? "Modaliteti ECO" : "ECO Mode"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Settings Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {lang === "sq" ? "Cilësimet" : "Settings"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {lang === "sq" ? "Funksionalitetet shtesë do të shtohen së shpejti." : "Additional features will be added soon."}
            </p>
            <Button variant="outline" disabled>
              <Settings className="w-4 h-4 mr-2" />
              {lang === "sq" ? "Ndrysho Cilësimet" : "Change Settings"}
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto space-y-10">
        <section className="glass-card p-6 md:p-8 rounded-2xl">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            {lang === "sq" ? "Profili im energjetik" : "My Energy Profile"}
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            {lang === "sq"
              ? "Ky panel ruan kursimet, pajisjet dhe faturat tuaja — një përmbledhje personale e ndikimit tuaj."
              : "This dashboard keeps your savings, devices, and bills in one place — your personal impact summary."}
          </p>
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              {lang === "sq" ? "Duke ngarkuar të dhënat e profilit..." : "Loading your profile data..."}
            </p>
          )}
          {!isLoading && dashboard && (
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="text-xs text-muted-foreground">
                  {lang === "sq" ? "Kursime mujore të vlerësuara" : "Estimated monthly savings"}
                </div>
                <div className="text-2xl font-display font-bold text-primary mt-1">
                  €{(dashboard.estimatedSavings || 0).toFixed(2)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="text-xs text-muted-foreground">
                  {lang === "sq" ? "Pikët e energjisë" : "Energy score"}
                </div>
                <div className="text-2xl font-display font-bold text-secondary mt-1">
                  {dashboard.energyScore}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-eco-teal/5 border border-eco-teal/20">
                <div className="text-xs text-muted-foreground">
                  {lang === "sq" ? "CO₂ e shmangur" : "CO₂ avoided"}
                </div>
                <div className="text-2xl font-display font-bold text-eco-teal mt-1">
                  {dashboard.co2Reduction.toFixed(1)} kg
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {lang === "sq" ? "Burimet kryesore të humbjeve" : "Top waste sources"}
            </h2>
            {topWasteDevices.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {lang === "sq"
                  ? "Shtoni pajisje në 'Smart Appliance Setup' për të parë burimet kryesore të humbjeve."
                  : "Add devices in Smart Appliance Setup to see your top waste sources."}
              </p>
            ) : (
              <ul className="space-y-3 text-sm">
                {topWasteDevices.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/60 border border-border/40"
                  >
                    <div>
                      <div className="font-medium text-foreground">{d.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {d.room} · {d.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {lang === "sq" ? "Humbje të vlerësuara" : "Est. waste"}
                      </div>
                      <div className="text-sm font-semibold text-destructive">
                        {(d.waste_kwh || 0).toFixed(2)} kWh
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {lang === "sq" ? "Rekomandime personale" : "Personalized recommendations"}
            </h2>
            {recommendations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {lang === "sq"
                  ? "Përdorni 'Smart Appliance Setup' dhe 'Bill Checker' për të gjeneruar rekomandime personale."
                  : "Use Smart Appliance Setup and Bill Checker to generate personalized recommendations."}
              </p>
            ) : (
              <ul className="space-y-3 text-sm">
                {recommendations.map((r) => (
                  <li
                    key={r.id}
                    className="p-3 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-foreground">
                        {lang === "sq" ? r.text_sq : r.text_en}
                      </p>
                      <span className="text-xs font-medium text-primary whitespace-nowrap">
                        {(lang === "sq" ? "Ndikim: " : "Impact: ") + (r.impact || "—")}
                      </span>
                    </div>
                    {(r.estimated_savings_kwh || r.estimated_savings_eur) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {lang === "sq" ? "Kursime të vlerësuara: " : "Estimated savings: "}
                        {r.estimated_savings_kwh
                          ? `${r.estimated_savings_kwh.toFixed(1)} kWh `
                          : ""}
                        {r.estimated_savings_eur
                          ? `(~€${r.estimated_savings_eur.toFixed(2)})`
                          : ""}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section>
          <div className="mb-2">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
              {lang === "sq" ? "Smart Appliance Setup" : "Smart Appliance Setup"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {lang === "sq"
                ? "Menaxhoni të gjitha pajisjet tuaja këtu: shtim manual, ngarkim fotosh, verifikim AI, editim dhe fshirje."
                : "Manage all your appliances here: manual add, photo upload, AI detection, edit, and delete."}
            </p>
          </div>
          <SmartApplianceSetup />
        </section>

        <DemoSection />
        <BillCheckerSection />
        <BillAnomalyAlerts />

        <section className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {lang === "sq" ? "Auto Complaint Generator" : "Auto Complaint Generator"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {lang === "sq"
                  ? "Klikoni butonin për të hapur gjeneratorin e ankesës dhe shkruani detajet tuaja."
                  : "Click the button to open the complaint generator and type your details."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowComplaintTool((prev) => !prev)}
              className="btn-outline-eco text-sm"
            >
              <FileText className="w-4 h-4" />
              {showComplaintTool
                ? lang === "sq"
                  ? "Mbylle"
                  : "Close"
                : lang === "sq"
                  ? "Hap Gjeneratorin"
                  : "Open Generator"}
            </button>
          </div>

          {showComplaintTool && (
            <div className="mt-5 space-y-4">
              <textarea
                value={complaintInput}
                onChange={(e) => setComplaintInput(e.target.value)}
                placeholder={
                  lang === "sq"
                    ? "Shkruani problemin tuaj (p.sh. data e faturës, anomalia, ndërrimi i tarifës, zona juaj)..."
                    : "Type your issue (e.g. bill date, anomaly, tariff switching problem, your area)..."
                }
                className="w-full min-h-[120px] px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-sm text-foreground whitespace-pre-wrap">
                {complaintInput.trim()
                  ? `${
                      lang === "sq" ? "Ankesë e Gjeneruar:\n\n" : "Generated Complaint:\n\n"
                    }${
                      lang === "sq"
                        ? "I/E nderuar Shërbimi i Klientëve,\n\nPo paraqes këtë ankesë lidhur me faturimin/tarifimin e energjisë elektrike. Bazuar në të dhënat e mia dhe verifikimet e fundit, kam vërejtur këto çështje:\n\n"
                        : "Dear Customer Service,\n\nI am submitting this complaint regarding my electricity billing/tariff behavior. Based on my data and recent checks, I observed the following issues:\n\n"
                    }${complaintInput}\n\n${
                      lang === "sq"
                        ? "Kërkoj rishikim të rastit dhe korrigjim të faturimit nëse konfirmohen mospërputhje.\n\nFaleminderit."
                        : "I request a full review of this case and billing correction if discrepancies are confirmed.\n\nThank you."
                    }`
                  : lang === "sq"
                    ? "Shkruani detajet sipër për të gjeneruar automatikisht draftin e ankesës."
                    : "Type details above to auto-generate your complaint draft."}
              </div>
            </div>
          )}
        </section>

        <ImpactSection />
      </main>

    </div>
  );
};


export default Profile;


