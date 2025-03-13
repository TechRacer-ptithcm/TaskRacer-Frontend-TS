import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar";
  import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
  
  const items = [
    { title: "Trang chủ", url: "/", icon: Home },
    { title: "Hộp thư", url: "/inbox", icon: Inbox },
    { title: "Lịch", url: "/calendar", icon: Calendar },
    { title: "Tìm kiếm", url: "/search", icon: Search },
    { title: "Cài đặt", url: "/settings", icon: Settings },
  ];
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>TaskRacer</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  