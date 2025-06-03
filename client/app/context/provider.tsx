'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export type TokenPayload = {
    email?: string;
    firstName?: string;
    lastName?: string;
    preferred_username?: string;
    exp?: number;
    [key: string]: any;
};

type AuthContextType = {
    user: TokenPayload;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: {} as TokenPayload,
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TokenPayload>({} as TokenPayload);

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
                setUser(decoded);
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
