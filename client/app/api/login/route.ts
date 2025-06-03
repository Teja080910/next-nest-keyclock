// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const state = crypto.randomBytes(16).toString('hex');

  const keycloakBase = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth`;
  const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI!;
  const scope = 'openid profile email';

  const loginUrl = `${keycloakBase}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;

  const response = NextResponse.redirect(loginUrl);
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return response;
}
