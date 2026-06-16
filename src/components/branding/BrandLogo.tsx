import Image from 'next/image';
import { Link } from '@/i18n/routing';

type BrandLogoProps = {
  href?: '/' | '/about' | '/arab-teams' | '/fan-zone' | '/competitions' | '/matches' | '/sign-in' | '/sign-up';
  className?: string;
  preload?: boolean;
};

export function BrandLogo({ href = '/', className = 'h-12 w-auto', preload = false }: BrandLogoProps) {
  const image = (
    <Image
      src="/TreTrip.png"
      alt="TreTrip"
      width={558}
      height={539}
      preload={preload}
      className={className}
    />
  );

  if (!href) {
    return image;
  }

  return <Link href={href}>{image}</Link>;
}
