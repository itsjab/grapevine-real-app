import { format } from 'date-fns';
import { desc, eq } from 'drizzle-orm';
import { MessageCircle, Plus } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MobileNavigation } from '@/components/nav-mobile';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { chat } from '@/lib/db/schema/chat';

export default async function ChatsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login?redirect=/dashboard/chats');
  }

  const userChats = await db
    .select()
    .from(chat)
    .where(eq(chat.userId, session.user.id))
    .orderBy(desc(chat.createdAt));

  return (
    <SidebarInset>
      <header className="hidden md:flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1 hidden md:block" />
        <Separator
          orientation="vertical"
          className="hidden md:block mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Chats</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <MobileNavigation activeLink="home" className="md:hidden" />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your Chats</h1>
          </div>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/dashboard/chat">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userChats.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No chats yet</h3>
                <p className="text-muted-foreground mb-4 text-center">
                  Start your first conversation to see it here
                </p>
              </CardContent>
            </Card>
          ) : (
            userChats.map((chatItem) => (
              <Link href={`/dashboard/chat/${chatItem.id}`} key={chatItem.id}>
                <Card key={chatItem.id} className="py-2">
                  <CardHeader className="px-3">
                    <CardTitle className="line-clamp-1">
                      {chatItem.title}
                    </CardTitle>
                    <CardDescription>
                      {format(chatItem.createdAt, 'MMM d, yyyy')} •{' '}
                      {chatItem.visibility}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </SidebarInset>
  );
}
