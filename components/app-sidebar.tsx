import Link from 'next/link';
import * as React from 'react';
import { GrapevineIcon } from '@/components/grapevine-icon';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavChats } from './nav-chats';
import { NavLoadingSkeleton } from './nav-loading-skeleton';
import { NavMain } from './nav-main';
import { NavTastingNotes } from './nav-tasting-notes';
import { NavUser } from './nav-user';

// Loading skeleton for NavUser
function NavUserSkeleton() {
  return (
    <div className="flex items-center gap-2 px-2 py-2 rounded-lg">
      <div className="size-8 rounded-lg bg-sidebar-foreground/10 animate-pulse" />
      <div className="grid flex-1 gap-1">
        <div className="h-4 bg-sidebar-foreground/10 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-sidebar-foreground/10 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 mb-4">
          <GrapevineIcon className="size-8" />
          <h1 className="text-lg font-semibold">Grapevine</h1>
        </Link>
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <React.Suspense fallback={<NavLoadingSkeleton title="Your Chats" />}>
          <NavChats />
        </React.Suspense>
        <React.Suspense
          fallback={<NavLoadingSkeleton title="Your Tasting Notes" />}
        >
          <NavTastingNotes />
        </React.Suspense>
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense fallback={<NavUserSkeleton />}>
          <NavUser />
        </React.Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
