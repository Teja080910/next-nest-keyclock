import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const stateCookie = req.cookies.get('oauth_state')?.value;
    console.log('State cookie:', stateCookie);
    const parsedState = stateCookie ? JSON.parse(stateCookie) : null;

    const redirect = parsedState?.redirect || '/';

    if (!code || !state) {
      return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
    }

    const tokenUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`;
    const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET!;
    const redirectUri = process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI!; // Must match exactly

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri, // Must not include query
      client_id: clientId,
      client_secret: clientSecret, // Remove if client is public
    });

    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error('Token exchange failed:', tokenData); // Log this!
      return NextResponse.json({ error: 'Token exchange failed', details: tokenData }, { status: 500 });
    }

    const response = NextResponse.redirect(redirect);
    response.cookies.set('access_token', tokenData.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Callback error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
