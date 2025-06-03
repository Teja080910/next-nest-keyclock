"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Cookies from "js-cookie";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
 

  if (!user) {
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