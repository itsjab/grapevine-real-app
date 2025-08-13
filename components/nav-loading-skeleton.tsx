import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavLoadingSkeletonProps {
  title: string;
  itemCount?: number;
}

export function NavLoadingSkeleton({
  title,
  itemCount = 3,
}: NavLoadingSkeletonProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {Array.from({ length: itemCount }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Just a skeleton loader>
          <SidebarMenuItem key={index}>
            <SidebarMenuButton disabled>
              <div className="size-4 rounded bg-sidebar-foreground/10 animate-pulse" />
              <div className="h-4 flex-1 rounded bg-sidebar-foreground/10 animate-pulse" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
