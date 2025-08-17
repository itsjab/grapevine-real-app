import { headers } from 'next/dist/server/request/headers';
import { redirect } from 'next/navigation';
import { MobileNavigation } from '@/components/nav-mobile';
import { SmallCardsSlider } from '@/components/small-cards-slider';
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
        <SmallCardsSlider
          headline="Guide: Fabulous Seven"
          items={[
            {
              id: '1',
              link: '/dashboard/guides/varieties/syrah',
              title: 'Syrah',
              gradient: 'linear-gradient(to right, #ad5389, #3c1053)',
            },
            {
              id: '2',
              link: '/dashboard/guides/varieties/cabernet-sauvignon',
              title: 'Cabernet Sauvignon',
              gradient:
                'linear-gradient(15deg, rgba(100, 36, 167, 1.000) 0.000%, rgba(100, 36, 167, 1.000) 7.692%, rgba(123, 39, 164, 1.000) 7.692%, rgba(123, 39, 164, 1.000) 15.385%, rgba(144, 47, 155, 1.000) 15.385%, rgba(144, 47, 155, 1.000) 23.077%, rgba(159, 57, 142, 1.000) 23.077%, rgba(159, 57, 142, 1.000) 30.769%, rgba(169, 70, 126, 1.000) 30.769%, rgba(169, 70, 126, 1.000) 38.462%, rgba(171, 84, 107, 1.000) 38.462%, rgba(171, 84, 107, 1.000) 46.154%, rgba(165, 99, 88, 1.000) 46.154%, rgba(165, 99, 88, 1.000) 53.846%, rgba(153, 114, 69, 1.000) 53.846%, rgba(153, 114, 69, 1.000) 61.538%, rgba(135, 129, 53, 1.000) 61.538%, rgba(135, 129, 53, 1.000) 69.231%, rgba(112, 141, 40, 1.000) 69.231%, rgba(112, 141, 40, 1.000) 76.923%, rgba(89, 151, 32, 1.000) 76.923%, rgba(89, 151, 32, 1.000) 84.615%, rgba(67, 159, 30, 1.000) 84.615%, rgba(67, 159, 30, 1.000) 92.308%, rgba(47, 162, 33, 1.000) 92.308% 100.000%)',
            },
            {
              id: '3',
              link: '/dashboard/guides/varieties/pinot-noir',
              title: 'Pinot Noir',
              gradient:
                'linear-gradient(210deg, rgba(129, 187, 184, 1.000) 0.000%, rgba(141, 181, 184, 1.000) 7.143%, rgba(153, 175, 183, 1.000) 14.286%, rgba(165, 168, 181, 1.000) 21.429%, rgba(178, 161, 179, 1.000) 28.571%, rgba(189, 152, 175, 1.000) 35.714%, rgba(200, 144, 171, 1.000) 42.857%, rgba(209, 135, 166, 1.000) 50.000%, rgba(217, 126, 161, 1.000) 57.143%, rgba(223, 117, 155, 1.000) 64.286%, rgba(226, 108, 148, 1.000) 71.429%, rgba(228, 99, 141, 1.000) 78.571%, rgba(227, 90, 133, 1.000) 85.714%, rgba(223, 83, 125, 1.000) 92.857%, rgba(218, 75, 116, 1.000) 100.000%)',
            },
            {
              id: '4',
              link: '/dashboard/guides/varieties/merlot',
              title: 'Merlot',
              gradient: 'linear-gradient(to right, #aa076b, #61045f)',
            },
            {
              id: '5',
              link: '/dashboard/guides/varieties/chardonnay',
              title: 'Chardonnay',
              gradient:
                'linear-gradient(90deg, rgb(218, 197, 116) 0%, rgb(218, 197, 116) 7.692%, rgb(217, 182, 86) 7.692%, rgb(217, 182, 86) 15.385%, rgb(213, 163, 55) 15.385%, rgb(213, 163, 55) 23.077%, rgb(208, 143, 23) 23.077%, rgb(208, 143, 23) 30.769%, rgb(200, 121, 0) 30.769%, rgb(200, 121, 0) 38.462%, rgb(190, 97, 0) 38.462%, rgb(190, 97, 0) 46.154%, rgb(178, 72, 0) 46.154%, rgb(178, 72, 0) 53.846%, rgb(165, 47, 0) 53.846%, rgb(165, 47, 0) 61.538%, rgb(150, 22, 0) 61.538%, rgb(150, 22, 0) 69.231%, rgb(134, 0, 0) 69.231%, rgb(134, 0, 0) 76.923%, rgb(116, 0, 0) 76.923%, rgb(116, 0, 0) 84.615%, rgb(98, 0, 0) 84.615%, rgb(98, 0, 0) 92.308%, rgb(80, 0, 0) 92.308%, rgb(80, 0, 0) 100%)',
            },
            {
              id: '6',
              link: '/dashboard/guides/varieties/sauvignon-blanc',
              title: 'Sauvignon Blanc',
              gradient: 'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
            },
            {
              id: '7',
              link: '/dashboard/guides/varieties/riesling',
              title: 'Riesling',
              gradient:
                'linear-gradient(300deg, rgba(255, 132, 123, 1.000) 0.000%, rgba(255, 198, 95, 1.000) 33.333%, rgba(205, 255, 115, 1.000) 66.667%, rgba(111, 255, 174, 1.000) 100.000%)',
            },
          ]}
        />
      </main>
    </SidebarInset>
  );
}
