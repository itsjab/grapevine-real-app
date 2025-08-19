import { MessageCircle, MoreHorizontal, Plus } from 'lucide-react';
import { headers } from 'next/headers';
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
import { getRecentChats } from '@/lib/db/queries/chat';

export async function NavChats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let chats: {
    name: string;
    url: string;
    emoji: string;
    id: string;
  }[] = [];

  if (session) {
    try {
      const recentChats = await getRecentChats(session);
      chats = recentChats.map((chat) => ({
        name: chat.title,
        url: `/dashboard/chat/${chat.id}`,
        emoji: '💬',
        id: chat.id,
      }));
    } catch (error) {
      console.error('Failed to fetch recent chats:', error);
    }
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Your Chats</SidebarGroupLabel>
      {chats.length > 0 && (
        <SidebarGroupAction asChild title="Start a new chat">
          <Link href="/dashboard/chat">
            <Plus /> <span className="sr-only">Start a new chat</span>
          </Link>
        </SidebarGroupAction>
      )}

      <SidebarMenu>
        {chats.length === 0 ? (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard/chat"
                className="text-sidebar-foreground/70"
              >
                <MessageCircle className="size-4" />
                <span>Start your first chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          <>
            {chats.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} title={item.name}>
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {chats.length === 4 && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-sidebar-foreground/70"
                >
                  <Link href="/dashboard/chat">
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
