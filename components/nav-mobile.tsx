import { GrapeIcon, Home, ListIcon, SearchIcon } from 'lucide-react';
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
      <div className="flex mx-4 shadow-sm z-10 top-6 relative">
        <Button
          asChild
          variant="outline"
          className="flex-1 h-14 justify-start bg-white border-r-0 rounded-xl rounded-r-none"
        >
          <Link href="/dashboard/chat">
            <GrapevineIcon className="!h-6 !w-8 shrink-0 block" />
            <div className="flex flex-col">
              <span className="font-semibold">
                Tap to write a tasting note{' '}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                (or ask a question)
              </span>
            </div>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          className="h-14 w-14 bg-white border-l-0 rounded-xl rounded-l-none"
        >
          <Link href="/dashboard/chats">
            <ListIcon className="size-6" />
            <span className="sr-only">View all chats</span>
          </Link>
        </Button>
      </div>
      <ul className="flex justify-between px-10 pb-3 pt-10 backdrop-blur-sm bg-white/80 dark:bg-background/80">
        <li>
          <Link
            href="/dashboard"
            className={cn({ 'text-primary': activeLink === 'home' })}
          >
            <Home size={24} />
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/guides"
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
