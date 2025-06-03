"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { auth , login, getToken} = useAuth();
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = auth;

  useEffect(() => {
    console.log(getToken())
    console.log("user", user)
    if (!isLoading && !isAuthenticated) {
      login();
      // router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  console.log(isLoading, isAuthenticated);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-6 md:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}