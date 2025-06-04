'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export type UserPayload = {
    id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    exp?: number;
};

export type TokenPayload = {
    sub: string;
    preferred_username: string;
    email: string;
    family_name?: string;
    given_name?: string;
}

type AuthContextType = {
    user: UserPayload;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: {} as UserPayload,
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserPayload>({} as UserPayload);

    useEffect(() => {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [key, val] = cookie.split('=');
            acc[key] = decodeURIComponent(val);
            return acc;
        }, {} as Record<string, string>);

        const token = cookies['access_token'];
        if (token) {
            try {
                const decoded: TokenPayload = jwtDecode(token);
                setUser({
                    id: decoded.sub,
                    username: decoded.preferred_username,
                    email: decoded.email,
                    firstName: decoded.family_name,
                    lastName: decoded.given_name,
                });
            } catch (err) {
                console.error('Invalid token:', err);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user.email ? true : false }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
