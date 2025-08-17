import { headers } from 'next/dist/server/request/headers';
import { redirect } from 'next/navigation';
import { MobileNavigation } from '@/components/nav-mobile';
import { TastingNotesSlider } from '@/components/tasting-notes-slider';
import { TopPicks } from '@/components/top-picks';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import WineTypewriter from '@/components/wine-typewriter';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login?redirect=/dashboard');
  }

  return (
    <SidebarInset>
      <header className="hidden md:flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <MobileNavigation activeLink="home" className="md:hidden" />
      <main className="grid gap-8 pt-6 px-4 pb-32 md:pb-4">
        <TopPicks />
        <TastingNotesSlider session={session} />
      </main>
    </SidebarInset>
  );
}
