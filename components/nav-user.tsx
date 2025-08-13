import { UserPlus } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { NavUserClient } from './nav-user-client';

export async function NavUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const user = session.user;

  if (user.isAnonymous) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild size="lg">
            <Link href="/signup">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">G</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Guest</span>
                <span className="truncate text-xs">
                  Sign up to save progress
                </span>
              </div>
              <UserPlus className="ml-auto size-4" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return <NavUserClient user={user} />;
}
