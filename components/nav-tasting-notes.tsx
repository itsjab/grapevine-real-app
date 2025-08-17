import { MoreHorizontal, Plus, WineIcon } from 'lucide-react';
import { headers } from 'next/dist/server/request/headers';
import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { getRecentTastingNotes } from '@/lib/db/queries/tasting-note';

export async function NavTastingNotes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let tastingNotes: {
    name: string;
    url: string;
    emoji: string;
  }[] = [];

  if (session) {
    try {
      const recentNotes = await getRecentTastingNotes(session);
      tastingNotes = recentNotes.map((note) => ({
        name: note.title,
        url: `/dashboard/tasting-notes/${note.id}`,
        emoji: '🍷',
      }));
    } catch (error) {
      console.error('Failed to fetch recent tasting notes:', error);
    }
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Your Tasting Notes</SidebarGroupLabel>
      {tastingNotes.length > 0 && (
        <SidebarGroupAction asChild title="Write a new tasting note">
          <Link href="/chat">
            <Plus /> <span className="sr-only">Write a new tasting note</span>
          </Link>
        </SidebarGroupAction>
      )}

      <SidebarMenu>
        {tastingNotes.length === 0 ? (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/chat" className="text-sidebar-foreground/70">
                <WineIcon className="size-4" />
                <span>Create your first note</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          <>
            {tastingNotes.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} title={item.name}>
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {tastingNotes.length === 4 && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-sidebar-foreground/70"
                >
                  <Link href="/tasting-notes">
                    <MoreHorizontal />
                    <span>More</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
