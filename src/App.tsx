import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { HouseholdProvider } from "@/hooks/useHousehold";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import SignUp from "./pages/SignUp.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";
import Bills from "./pages/Bills.tsx";
import Tariffs from "./pages/Tariffs.tsx";
import Community from "./pages/Community.tsx";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="glass-card px-6 py-4 rounded-2xl text-sm text-muted-foreground">
          Loading your EcoWatt account...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-up" state={{ from: location }} replace />;
  }

  return children;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HouseholdProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/tariffs" element={<Tariffs />} />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/bills"
                  element={
                    <RequireAuth>
                      <Bills />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/community-map"
                  element={
                    <RequireAuth>
                      <Community />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </HouseholdProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
