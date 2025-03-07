import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <Sidebar
      className={`transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 h-full w-64 bg-white shadow-lg`}
    >
      <SidebarHeader>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>{/* Add grouped navigation items here */}</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* Add footer content here */}</SidebarFooter>
    </Sidebar>
  );
}
