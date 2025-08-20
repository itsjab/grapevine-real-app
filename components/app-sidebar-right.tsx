'use client';

import { XIcon } from 'lucide-react';
import * as React from 'react';
import { TastingGuide } from '@/components/tasting-guide-collapsible';
import {
  SidebarRight as Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleRightSidebar } = useSidebar();
  return (
    <Sidebar side="right" collapsible="offcanvas" {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between gap-2 my-2">
        <span className="text-lg font-semibold">Tasting Guide</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleRightSidebar}
          className="hidden md:inline-flex"
        >
          <XIcon size={24} />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <TastingGuide defaultOpen="appearance" />
      </SidebarContent>
    </Sidebar>
  );
}
