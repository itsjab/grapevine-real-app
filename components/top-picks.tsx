import Link from 'next/link';
import { Card, CardCaption, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export function TopPicks() {
  const staticItems = [
    {
      caption: 'Featured Red',
      name: 'Nebbiolo',
      link: '/dashboard/guides/varieties/nebbiolo',
      gradient:
        'linear-gradient(155deg, rgb(178, 34, 34) 0%, rgb(205, 92, 92) 30%, rgb(255, 140, 0) 60%, rgb(160, 82, 45) 100%)',
      textColor: 'text-background',
    },
    {
      caption: 'Featured White',
      name: 'Albariño',
      link: '/dashboard/guides/varieties/albarino',
      gradient:
        'radial-gradient(ellipse at 70% 30%, rgb(255, 255, 224) 0%, rgb(240, 255, 240) 20%, rgb(173, 216, 230) 40%, rgb(176, 224, 230) 60%, rgb(255, 250, 205) 80%, rgb(245, 255, 250) 100%)',
      textColor: 'text-foreground',
    },
    // {
    //   caption: 'Featured Region',
    //   name: 'Bordeaux',
    //   link: '/guides/regions/bordeaux',
    //   gradient:
    //     'linear-gradient(135deg, rgb(255, 255, 196) 0%, rgb(255, 255, 196) 33.333%, rgb(255, 97, 100) 33.333%, rgb(255, 97, 100) 66.667%, rgb(176, 0, 18) 66.667%, rgb(176, 0, 18) 100%)',
    //   textColor: 'text-white',
    // },
  ];
  return (
    <section>
      <h2 className="text-xl font-semibold">Top Picks for You</h2>
      <Carousel className="mt-4 -mx-4 max-w-screen" opts={{ dragFree: true }}>
        <CarouselContent>
          {staticItems.map((item) => (
            <CarouselItem
              className="flex basis-60 first-of-type:ml-4 last-of-type:pr-4"
              key={item.link}
            >
              <Link className="block w-full" href={item.link}>
                <CardCaption>{item.caption}</CardCaption>
                <Card
                  style={{
                    backgroundImage: item.gradient,
                  }}
                  className={cn(item.textColor, 'h-[296px]')}
                >
                  <CardContent className="flex flex-1 items-end px-4">
                    <span className="text-xl">{item.name}</span>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
