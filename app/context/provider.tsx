'use client';

import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

export type UserPayload = {
    id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    exp?: number;
    token?: string;
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
    loading?: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: {} as UserPayload,
    isAuthenticated: false,
    loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserPayload>({} as UserPayload);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
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
                    token: token,
                });
                setIsLoading(false);
            } catch (err) {
                console.error('Invalid token:', err);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, []);

    if(isLoading){
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user.id ? true : false, loading: user.id ? false : true }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
