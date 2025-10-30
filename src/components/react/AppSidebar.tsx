import { Calendar, Home, File, Inbox } from "lucide-react";

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
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
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
    icon: Home
  },
  {
    title: "行事曆",
    url: "/calendar",
    icon: Calendar
  }
];

export function AppSidebar({ posts = [], path }: AppSidebarProps) {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>114 東海駭客社</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={path === item.url}>
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
                      isActive={path?.startsWith("/posts")}
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
                            isActive={path === post.url}
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
