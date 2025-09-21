import { type ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/react/AppSidebar";
import { ThemeToggle } from "@/components/react/ModeToggle";

interface SidebarLayoutProps {
  children: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
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
