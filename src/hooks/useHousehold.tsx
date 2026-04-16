import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { createHousehold, getOrCreateHousehold, seedUserData } from "@/services/energyService";

interface HouseholdContextType {
  householdId: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const HouseholdContext = createContext<HouseholdContextType | undefined>(undefined);

export function HouseholdProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) {
      setHouseholdId(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let household = await getOrCreateHousehold(user.id);
      if (!household) {
        // First try to create a minimal household directly.
        try {
          household = await createHousehold({
            user_id: user.id,
            name: user.user_metadata?.first_name
              ? `${user.user_metadata.first_name}'s Home`
              : "My Home",
            city: user.user_metadata?.city || "Prishtinë",
            num_members: Number(user.user_metadata?.household_size) || 4,
            meter_type: user.user_metadata?.meter_type || "dual",
          });
        } catch {
          // If direct insert fails (e.g. policy/config mismatch), fall back to seed function.
          const res = await seedUserData();
          if (res.household_id) {
            household = await getOrCreateHousehold(user.id);
          }
        }
      }
      setHouseholdId(household?.id ?? null);
    } catch (e) {
      console.error("Failed to load household:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [user]);

  return (
    <HouseholdContext.Provider value={{ householdId, loading, refresh: load }}>
      {children}
    </HouseholdContext.Provider>
  );
}

export function useHousehold() {
  const ctx = useContext(HouseholdContext);
  if (!ctx) throw new Error("useHousehold must be used within HouseholdProvider");
  return ctx;
}
