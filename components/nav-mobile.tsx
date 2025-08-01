import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function MobileNavigation({ ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn(
        'w-screen flex justify-around md:hidden fixed bottom-8 z-[100000]',
        props.className,
      )}
      {...props}
    >
      <li>
        <SidebarTrigger />
      </li>
    </ul>
  );
}
