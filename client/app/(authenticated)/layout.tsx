"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ReactNode } from "react";
import { useAuth } from "../context/provider";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {

  const { user, isAuthenticated } = useAuth()

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