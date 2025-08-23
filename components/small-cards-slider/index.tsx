import Link from 'next/link';
import { Card, CardCaption } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface SmallCardsSliderProps {
  headline: string;
  items: {
    id: string;
    link: string;
    title: string;
    gradient?: string;
    caption?: string;
  }[];
}

function SmallCardsSlider({ headline, items }: SmallCardsSliderProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">{headline}</h2>
      <Carousel className="mt-4 -mx-4 max-w-screen" opts={{ dragFree: true }}>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem
              className="flex basis-40 first-of-type:ml-4"
              key={item.id}
            >
              <Link href={item.link} key={item.id} className="block w-36">
                <Card
                  className="size-36"
                  style={{
                    backgroundImage:
                      item.gradient ||
                      'conic-gradient(from 90deg, rgb(47, 17, 54) 0deg, rgb(47, 17, 54) 27.692deg, rgb(52, 18, 52) 27.692deg, rgb(52, 18, 52) 55.385deg, rgb(58, 22, 52) 55.385deg, rgb(58, 22, 52) 83.077deg, rgb(66, 28, 56) 83.077deg, rgb(66, 28, 56) 110.769deg, rgb(74, 35, 62) 110.769deg, rgb(74, 35, 62) 138.462deg, rgb(83, 45, 70) 138.462deg, rgb(83, 45, 70) 166.154deg, rgb(91, 55, 81) 166.154deg, rgb(91, 55, 81) 193.846deg, rgb(99, 67, 93) 193.846deg, rgb(99, 67, 93) 221.538deg, rgb(105, 80, 107) 221.538deg, rgb(105, 80, 107) 249.231deg, rgb(110, 92, 122) 249.231deg, rgb(110, 92, 122) 276.923deg, rgb(112, 104, 138) 276.923deg, rgb(112, 104, 138) 304.615deg, rgb(112, 116, 153) 304.615deg, rgb(112, 116, 153) 332.308deg, rgb(110, 126, 169) 332.308deg, rgb(110, 126, 169) 360deg)',
                  }}
                ></Card>
                <CardCaption className="mt-2 w-36">
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-foreground">{item.title}</p>
                    {item.caption && (
                      <p className="line-clamp-1 text-foreground-muted">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </CardCaption>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export { SmallCardsSlider };
