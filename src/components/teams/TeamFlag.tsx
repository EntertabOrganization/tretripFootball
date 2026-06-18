import Image from 'next/image';
import { ARAB_TEAM_LOOKUP } from '@/data/arabTeams';
import { cn } from '@/lib/utils';

type TeamFlagProps = {
  alt: string;
  teamCode?: string;
  src?: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  priority?: boolean;
};

export function TeamFlag({
  alt,
  teamCode,
  src,
  className,
  imageClassName,
  fallbackClassName,
  priority = false,
}: TeamFlagProps) {
  const team = teamCode ? ARAB_TEAM_LOOKUP[teamCode] : undefined;
  const imageSrc = src?.startsWith('/flags/') ? src : team?.flagImage;

  if (imageSrc) {
    return (
      <span className={cn('relative inline-flex shrink-0 overflow-hidden', className)}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 64px, 96px"
          className={cn('object-cover', imageClassName)}
        />
      </span>
    );
  }

  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center', className, fallbackClassName)} aria-label={alt}>
      {src || '⚽'}
    </span>
  );
}
