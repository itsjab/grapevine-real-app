import { XIcon } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Chat } from '@/components/chat';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries/chat';
import { convertToUIMessages, generateUUID } from '@/lib/utils';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login?redirect=/dashboard/chat');
  }

  const chat = await getChatById({ id });

  if (chat) {
    const messagesFromDb = await getMessagesByChatId({
      id,
    });

    const uiMessages = convertToUIMessages(messagesFromDb);

    return (
      <SidebarInset>
        <header className="flex h-10 md:h-16 shrink-0 items-center gap-2 md:border-b px-4">
          <SidebarTrigger className="-ml-1 hidden md:block" />
          <Separator
            orientation="vertical"
            className="hidden md:block mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <XIcon size={24} />
                  <span className="sr-only">Back to Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="w-full">
          <Chat id={id} initialMessages={uiMessages} isReadonly={false} />
        </main>
      </SidebarInset>
    );
  }

  const uuid = generateUUID();
  return (
    <SidebarInset>
      <header className="flex h-10 md:h-16 shrink-0 items-center gap-2 md:border-b px-4">
        <SidebarTrigger className="-ml-1 hidden md:block" />
        <Separator
          orientation="vertical"
          className="hidden md:block mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <XIcon size={24} />
                <span className="sr-only">Back to Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="w-full">
        <Chat id={uuid} initialMessages={[]} isReadonly={false} />
      </main>
    </SidebarInset>
  );
}
