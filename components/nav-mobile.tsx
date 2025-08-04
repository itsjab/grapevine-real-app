import { GrapeIcon, Home, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { GrapevineIcon } from '@/components/grapevine-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MobileNavigationProps = {
  activeLink: string;
} & React.ComponentProps<'nav'>;

export function MobileNavigation({
  activeLink,
  ...props
}: MobileNavigationProps) {
  return (
    <nav
      {...props}
      className={cn(
        'flex flex-col w-screen fixed bottom-0 z-50',
        props.className,
      )}
    >
      <Button
        asChild
        variant="outline"
        className="mx-4 h-14 justify-start shadow-sm rounded-xl relative z-10 top-6 bg-white"
      >
        <Link href="/chat" className="flex">
          <GrapevineIcon className="!h-6 !w-8 shrink-0 block" />
          <div className="flex flex-col">
            <span className="font-semibold">Tap to write a tasting note </span>
            <span className="text-xs font-medium text-muted-foreground">
              (or ask a question)
            </span>
          </div>
        </Link>
      </Button>
      <ul className="flex justify-between px-10 pb-6 pt-10 backdrop-blur-sm">
        <li>
          <Link
            href="/"
            className={cn({ 'text-primary': activeLink === 'home' })}
          >
            <Home size={24} />
          </Link>
        </li>
        <li>
          <Link
            href="/guides"
            className={cn({ 'text-primary': activeLink === 'guides' })}
          >
            <GrapeIcon size={24} />
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={cn({ 'text-primary': activeLink === 'search' })}
          >
            <SearchIcon size={24} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
