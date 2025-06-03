import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const keycloakBase = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
  const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;
  const postLogoutRedirectUri = process.env.NEXT_PUBLIC_KEYCLOAK_LOGOUT_REDIRECT_URI || 'http://localhost:3000';

  const logoutUrl = `${keycloakBase}/realms/${realm}/protocol/openid-connect/logout?client_id=${clientId}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;

  const response = NextResponse.redirect(logoutUrl);

  // Clear token cookies
  response.cookies.set('access_token', '', {
    maxAge: 0,
    path: '/',
  });

  return response;
}
