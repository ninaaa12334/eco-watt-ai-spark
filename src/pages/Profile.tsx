import { useAuth } from "@/hooks/useAuth";
import { useHousehold } from "@/hooks/useHousehold";
import { useDashboard } from "@/hooks/useEnergy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Home, Zap, Users, MapPin, Calendar, Settings } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  const { user } = useAuth();
  const { householdId } = useHousehold();
  const { data: dashboard, isLoading } = useDashboard();
  const { lang, t } = useLanguage();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{lang === "sq" ? "Duhet të jeni i kyçur" : "You need to be logged in"}</h1>
            <Button asChild>
              <a href="/sign-up">{lang === "sq" ? "Kyçu" : "Sign In"}</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
    </div>
  );
};

export default Profile;