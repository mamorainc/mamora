"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavGroup } from "./nav-group";
import { sidebarData } from "./data/sidebar-data";
import { Logo } from "@/components/logo";
import { useGetChats } from "@/hooks/use-chat";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const { data: chats, isLoading: isChatsLoading } = useGetChats();

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <Logo isSidebarOpen={open} href="/dashboard" />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup {...sidebarData.navGroups[0]} />
        {isChatsLoading ? (
          <SidebarMenu>
            {Array.from({ length: 10 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <NavGroup
            title="Main"
            items={[
              {
                title: "Create Chat",
                url: "/chat",
              },
              ...(chats?.map((item) => ({
                title: `Chat - ${item.created_at}`,
                url: `/chat/${item.id}` || "",
              })) || []),
            ]}
          />
        )}
        {/* <NavGroup {...sidebarData.navGroups[2]} /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
