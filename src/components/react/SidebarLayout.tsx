import { type ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/react/AppSidebar";
import { ThemeToggle } from "@/components/react/ModeToggle";
import { NavbarAnchors } from "@/components/react/NavbarAnchors";

interface Post {
  filename: string;
  title: string;
  author: string;
  url: string;
  path: string;
}

interface SidebarLayoutProps {
  children: ReactNode;
  posts?: Post[];
  showAnchors?: boolean;
  path?: string;
}

export function SidebarLayout({
  children,
  posts,
  showAnchors = false,
  path,
}: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar posts={posts} path={path} />
      <main className="relative h-full w-full px-4">
        <nav className="bg-background/50 sticky top-0 right-0 left-0 z-10 flex items-center justify-between py-2 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="m-2 cursor-pointer" />
            {showAnchors && <NavbarAnchors />}
          </div>
          <ThemeToggle />
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
}
