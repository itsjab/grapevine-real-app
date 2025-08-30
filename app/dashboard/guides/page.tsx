import { asc, desc } from 'drizzle-orm';
import { Book } from 'lucide-react';
import { headers } from 'next/dist/server/request/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MobileNavigation } from '@/components/nav-mobile';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardCaption, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { grapeVariety } from '@/lib/db/schema/wine';

async function getAllGrapeVarieties() {
  const varieties = await db
    .select()
    .from(grapeVariety)
    .orderBy(asc(grapeVariety.createdAt));

  return varieties;
}

// Generate gradients for grape varieties based on their characteristics
function getVarietyGradient(name: string): React.CSSProperties {
  // Create different gradient patterns based on variety name for visual variety
  const gradients: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'oklch(45% 0.18 280)',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1111 1111' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\"), radial-gradient(circle at 30% 20%, oklch(70% 0.25 270) 0%, transparent 50%), radial-gradient(circle at 70% 70%, oklch(40% 0.2 290) 0%, transparent 60%), radial-gradient(circle at 20% 80%, oklch(55% 0.15 260) 0%, transparent 55%)",
      backgroundBlendMode: 'overlay, normal, normal, normal',
    },
    red: {
      backgroundColor: 'oklch(40% 0.2 10)',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1111 1111' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\"), radial-gradient(circle at 25% 30%, oklch(60% 0.28 15) 0%, transparent 60%), radial-gradient(circle at 75% 65%, oklch(35% 0.22 5) 0%, transparent 65%), radial-gradient(circle at 40% 85%, oklch(45% 0.18 20) 0%, transparent 55%)",
      backgroundBlendMode: 'overlay, normal, normal, normal',
    },
    white: {
      backgroundColor: 'oklch(70% 0.08 90)',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1111 1111' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\"), radial-gradient(circle at 35% 25%, oklch(85% 0.12 80) 0%, transparent 50%), radial-gradient(circle at 65% 75%, oklch(65% 0.1 100) 0%, transparent 60%), radial-gradient(circle at 25% 70%, oklch(75% 0.06 85) 0%, transparent 55%)",
      backgroundBlendMode: 'overlay, normal, normal, normal',
    },
  };

  // Categorize varieties by typical color
  const redVarieties = [
    'pinot-noir',
    'cabernet-sauvignon',
    'merlot',
    'syrah',
    'malbec',
    'grenache',
    'tempranillo',
    'sangiovese',
    'nebbiolo',
    'zinfandel',
  ];
  const whiteVarieties = [
    'chardonnay',
    'sauvignon-blanc',
    'riesling',
    'pinot-grigio',
    'pinot-gris',
    'chenin-blanc',
    'gewurztraminer',
    'albariño',
    'viognier',
    'semillon',
  ];

  const lowerName = name.toLowerCase().replace(/\s+/g, '-');

  if (redVarieties.includes(lowerName)) {
    return gradients.red;
  } else if (whiteVarieties.includes(lowerName)) {
    return gradients.white;
  }

  return gradients.default;
}

export default async function GuidesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login?redirect=/dashboard/guides');
  }

  const varieties = await getAllGrapeVarieties();

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
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard/guides">Guides</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <MobileNavigation activeLink="guides" className="md:hidden" />

      <main className="pt-6 px-4 pb-32 md:pb-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Grape Variety Guides</h1>
          <p className="text-foreground-muted">
            Explore detailed guides about different grape varieties and their
            characteristics.
          </p>
        </div>

        {varieties.length === 0 ? (
          <div className="mt-8">
            <p className="text-foreground-muted mb-6">
              No grape variety guides are available yet. Check back soon!
            </p>
            <Card className="size-36">
              <CardContent className="h-full flex items-center justify-center">
                <Book className="size-10 text-muted-foreground" />
              </CardContent>
            </Card>
            <CardCaption className="mt-2 w-36">Guides coming soon</CardCaption>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
            {varieties.map((variety) => (
              <Link
                href={`/dashboard/guides/varieties/${variety.id}`}
                key={variety.id}
                className="block w-36"
              >
                <Card
                  className="size-36"
                  style={getVarietyGradient(variety.name)}
                />
                <CardCaption className="mt-2 w-36">
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-foreground">
                      {variety.name}
                    </p>
                    {variety.teaser && (
                      <p className="line-clamp-2 text-foreground-muted text-xs">
                        {variety.teaser}
                      </p>
                    )}
                  </div>
                </CardCaption>
              </Link>
            ))}
          </div>
        )}
      </main>
    </SidebarInset>
  );
}
