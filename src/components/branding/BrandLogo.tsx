import Image from 'next/image';
import { Link } from '@/i18n/routing';

type BrandLogoProps = {
  href?: '/' | '/about' | '/arab-teams' | '/fan-zone' | '/competitions' | '/matches' | '/sign-in' | '/sign-up';
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ href = '/', className = 'h-12 w-auto', priority = false }: BrandLogoProps) {
  const image = (
    <Image
      src="/TreTrip.svg"
      alt="TreTrip"
      width={556}
      height={556}
      priority={priority}
      className={className}
    />
  );

  if (!href) {
    return image;
  }

  return <Link href={href}>{image}</Link>;
}
