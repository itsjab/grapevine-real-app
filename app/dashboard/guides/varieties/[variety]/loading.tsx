import { GrapevineIcon } from '@/components/grapevine-icon';
import WineTypewriter from '@/components/wine-typewriter';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen gap-2">
      <GrapevineIcon className="size-6" />
      <WineTypewriter />
    </div>
  );
}
