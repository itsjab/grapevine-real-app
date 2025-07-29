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
      link: '/varieties/nebbiolo',
      gradient:
        'linear-gradient(45deg, rgb(250, 218, 97) 0%, rgb(250, 218, 97) 33.333%, rgb(255, 145, 136) 33.333%, rgb(255, 145, 136) 66.667%, rgb(255, 90, 205) 66.667%, rgb(255, 90, 205) 100%)',
      textColor: 'text-black',
    },
    {
      caption: 'Featured White',
      name: 'Riesling',
      link: '/varieties/riesling',
      gradient:
        'conic-gradient(from 90deg, rgb(47, 17, 54) 0deg, rgb(47, 17, 54) 27.692deg, rgb(52, 18, 52) 27.692deg, rgb(52, 18, 52) 55.385deg, rgb(58, 22, 52) 55.385deg, rgb(58, 22, 52) 83.077deg, rgb(66, 28, 56) 83.077deg, rgb(66, 28, 56) 110.769deg, rgb(74, 35, 62) 110.769deg, rgb(74, 35, 62) 138.462deg, rgb(83, 45, 70) 138.462deg, rgb(83, 45, 70) 166.154deg, rgb(91, 55, 81) 166.154deg, rgb(91, 55, 81) 193.846deg, rgb(99, 67, 93) 193.846deg, rgb(99, 67, 93) 221.538deg, rgb(105, 80, 107) 221.538deg, rgb(105, 80, 107) 249.231deg, rgb(110, 92, 122) 249.231deg, rgb(110, 92, 122) 276.923deg, rgb(112, 104, 138) 276.923deg, rgb(112, 104, 138) 304.615deg, rgb(112, 116, 153) 304.615deg, rgb(112, 116, 153) 332.308deg, rgb(110, 126, 169) 332.308deg, rgb(110, 126, 169) 360deg)',
      textColor: 'text-white',
    },
    {
      caption: 'Featured Region',
      name: 'Bordeaux',
      link: '/regions/bordeaux',
      gradient:
        'linear-gradient(135deg, rgb(255, 255, 196) 0%, rgb(255, 255, 196) 33.333%, rgb(255, 97, 100) 33.333%, rgb(255, 97, 100) 66.667%, rgb(176, 0, 18) 66.667%, rgb(176, 0, 18) 100%)',
      textColor: 'text-white',
    },
  ];
  return (
    <section>
      <h2 className="text-xl font-semibold">Top Picks for You</h2>
      <Carousel className="mt-4 -mx-4" opts={{ containScroll: 'trimSnaps' }}>
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
