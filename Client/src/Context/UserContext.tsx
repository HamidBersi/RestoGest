// src/context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { apiCall } from "@/lib/api";

type User = { name: string; email: string; role: string; avatar?: string };
type UserContextType = { user: User | null; setUser: (u: User | null) => void };

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiCall<{ user: User }>("/auth/me")
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {
        // Utilisateur non authentifié
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
