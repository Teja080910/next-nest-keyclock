"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, NotebookPen, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "My Notes",
    path: "/notes",
    protected: true,
  },
];

export function Header() {
  const pathname = usePathname();
  const { auth, login, logout } = useAuth();
  const { isAuthenticated, user, isLoading } = auth;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <NotebookPen className="h-6 w-6" />
          <span className="font-semibold text-xl">NoteSpace</span>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          {routes.map((route) => {
            // Skip protected routes if not authenticated
            if (route.protected && !isAuthenticated) return null;
            
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === route.path
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {route.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isLoading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={login}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}