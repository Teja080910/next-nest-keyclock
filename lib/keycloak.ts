"use client";

import Keycloak from "keycloak-js";
import Cookies from "js-cookie";

const keycloak = new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL!,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
});

export default keycloak;

export const initKeycloak = async () => {
  keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
    if (authenticated) {
      Cookies.set('token', keycloak.token!, { expires: 1 });
      console.log('Logged in', keycloak.token);
    } else {
      console.warn('Not authenticated');
    }
  });
};

export const login = async () => {
  await initKeycloak();
  return keycloak.login();
};

export const logout = () => {
  keycloak.logout();
};

export const getToken = () => {
  return keycloak?.token || localStorage.getItem("kc_token") || undefined;
};


export const isAuthenticated = () => keycloak.authenticated;

export { keycloak };
