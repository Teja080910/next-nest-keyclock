"use client";

import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL!,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
});

export const initKeycloak = async () => {
  if (!keycloak) return { authenticated: false };
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      checkLoginIframe: false,
    });
    if (authenticated) {
      localStorage.setItem('kc_token', keycloak.token || '');
      localStorage.setItem('kc_refreshToken', keycloak.refreshToken || '');
    }
    return { authenticated, keycloak };
  } catch (error) {
    console.error('Failed to initialize Keycloak:', error);
    return { authenticated: false };
  }
};

export const login = async () => {
  await initKeycloak();
  return keycloak.login({
    redirectUri: window.location.origin + '/',
  });
};

export const logout = () => {
  keycloak.logout();
};

export const getToken = () => {
  return keycloak?.token || localStorage.getItem("kc_token") || undefined;
};


export const isAuthenticated = () => keycloak.authenticated;

export { keycloak };
