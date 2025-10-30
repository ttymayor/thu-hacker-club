import { Calendar, Home, File, Inbox } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Post {
  filename: string;
  title: string;
  author: string;
  url: string;
  path: string;
}

interface AppSidebarProps {
  posts?: Post[];
  path?: string;
}

// Menu items.
const items = [
  {
    title: "首頁",
    url: "/",
    icon: Home,
  },
  {
    title: "行事曆",
    url: "/calendar",
    icon: Calendar,
  },
];

export function AppSidebar({ posts = [], path }: AppSidebarProps) {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  // 確保只在客戶端執行
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // 監聽路由變化（如果使用 Astro transitions）
  useEffect(() => {
    if (!isClient) return;

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // 監聽 popstate 事件（瀏覽器前進/後退）
    window.addEventListener("popstate", handleLocationChange);

    // 監聽 Astro 的路由變化事件
    document.addEventListener("astro:page-load", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("astro:page-load", handleLocationChange);
    };
  }, [isClient]);

  // 使用客戶端路徑，如果不可用則回退到服務器端路徑
  const activePath = isClient ? currentPath : path || "";

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>114 東海駭客社</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={activePath === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="cursor-pointer"
                      isActive={activePath?.startsWith("/posts")}
                    >
                      <Inbox />
                      <span>114 東海駭客社 - 上課內容</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {posts.map((post) => (
                        <SidebarMenuSubItem key={post.filename}>
                          <SidebarMenuSubButton
                            asChild
                            size="sm"
                            isActive={activePath === post.url}
                          >
                            <a href={post.url}>
                              <File />
                              <span>{post.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
