import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Lock, UserCheck } from "lucide-react";
import './globals.css';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Capture Your Thoughts, <br />
              <span className="text-primary">Organize Your Ideas</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              A simple, secure note-taking application to keep your thoughts organized
              and accessible from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/notes">
                <Button size="lg" className="gap-2">
                  <FileText className="h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose NoteSpace?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Simple & Intuitive</h3>
                <p className="text-muted-foreground">
                  Create, edit, and organize your notes with a clean and user-friendly interface.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your notes are protected with industry-standard authentication and encryption.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <UserCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personal & Organized</h3>
                <p className="text-muted-foreground">
                  Keep your thoughts organized with categories and custom tagging options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of users who trust NoteSpace for their note-taking needs.
            </p>
            <Link href="/notes">
              <Button size="lg" className="gap-2">
                <FileText className="h-5 w-5" />
                Start Taking Notes
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}