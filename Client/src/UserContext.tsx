// src/context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

type User = { name: string; email: string; role: string; avatar?: string };
type UserContextType = { user: User | null; setUser: (u: User | null) => void };

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Récupère l'utilisateur connecté au chargement de l'app
  useEffect(() => {
    fetch("http://localhost:4000/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data?.user && setUser(data.user));
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
