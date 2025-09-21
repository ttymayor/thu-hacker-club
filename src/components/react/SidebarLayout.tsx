import { type ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/react/AppSidebar";
import { ThemeToggle } from "@/components/react/ModeToggle";

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
}

export function SidebarLayout({ children, posts }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar posts={posts} />
      <main className="m-4 w-full h-full">
        <nav className="py-2 flex justify-between items-center bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger className="m-2 cursor-pointer" />
          <ThemeToggle />
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
}
