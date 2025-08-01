'use client';

import { Home, Search, Sparkles } from 'lucide-react';
import * as React from 'react';
import { GrapevineIcon } from '@/components/grapevine-icon';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavTastingNotes } from './nav-tasting-notes';

// This is sample data.
const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Ask AI',
      url: '#',
      icon: Sparkles,
    },
  ],
  tastingNotes: [
    {
      name: 'Tasting Note 1',
      url: '#',
      emoji: '🍷',
    },
    {
      name: 'Tasting Note 2',
      url: '#',
      emoji: '🍇',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <GrapevineIcon className="size-8" />
          <h1 className="text-lg font-semibold">Grapevine</h1>
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavTastingNotes tastingNotes={data.tastingNotes} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
