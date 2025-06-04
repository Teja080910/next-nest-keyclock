"use client";

import { initKeycloak, login, logout, getToken } from "@/lib/keycloak";
import { AuthState, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  auth: AuthState;
  login: () => void;
  logout: () => void;
  getToken: () => string | undefined;
}

const AuthContext = createContext<AuthContextProps>({
  auth: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
  },
  login,
  logout,
  getToken,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const kc = await initKeycloak();

        if (kc.authenticated) {
          const userInfo = await kc.keycloak?.loadUserInfo();

          const user: User = {
            id: kc.keycloak?.subject || "",
            username: (userInfo as any).preferred_username || "",
            email: (userInfo as any).email || "",
            firstName: (userInfo as any).given_name || "",
            lastName: (userInfo as any).family_name || "",
          };

          // Save tokens
          localStorage.setItem("kc_token", kc.keycloak?.token || "");
          localStorage.setItem("kc_refreshToken", kc.keycloak?.refreshToken || "");

          if (kc.keycloak) {
            kc.keycloak.onTokenExpired = async () => {
              try {
                await kc.keycloak?.updateToken(30);
                localStorage.setItem("kc_token", kc.keycloak?.token || "");
                localStorage.setItem("kc_refreshToken", kc.keycloak?.refreshToken || "");
              } catch (e) {
                console.error("Failed to refresh token:", e);
              }
            };
          }

          setAuth({
            isAuthenticated: true,
            user,
            isLoading: false,
          });
        } else {
          setAuth({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Keycloak init error:", error);
        setAuth({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
