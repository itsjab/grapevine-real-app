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
import { NavMain } from './nav-main';
import { NavTastingNotes } from './nav-tasting-notes';
import { NavUser } from './nav-user';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 mb-4">
          <GrapevineIcon className="size-8" />
          <h1 className="text-lg font-semibold">Grapevine</h1>
        </Link>
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <React.Suspense fallback={<div>Loading...</div>}>
          <NavTastingNotes />
        </React.Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
