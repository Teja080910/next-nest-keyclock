import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code || !state) {
      return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
    }

    const tokenUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`;
    const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET!;
    const redirectUri = process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI!; // must match

    // Exchange code for token
    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'Token exchange failed', details: tokenData }, { status: 500 });
    }

    const response = NextResponse.redirect(process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI_AFTER_LOGIN || '/');

    response.cookies.set('access_token', tokenData.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  } catch (error:any) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
