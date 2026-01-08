import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(localStorage.getItem("auth"))
  );

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
