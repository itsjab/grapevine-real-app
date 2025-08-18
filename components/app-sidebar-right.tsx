'use client';

import * as React from 'react';
import { TastingGuide } from '@/components/tasting-guide-collapsible';
import {
  SidebarRight as Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" collapsible="offcanvas" {...props}>
      <SidebarHeader className="flex gap-2">
        <span className="text-muted-foreground">Tasting Guide</span>
      </SidebarHeader>
      <SidebarContent>
        <TastingGuide defaultOpen="appearance" />
      </SidebarContent>
    </Sidebar>
  );
}
