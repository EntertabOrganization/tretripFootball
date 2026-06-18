export type FanUploadItem = {
  id: string;
  type: 'image' | 'video';
  titleKey: string;
  descriptionKey: string;
  railKey: string;
  labelKey: string;
  cardClassName: string;
  accentClassName: string;
  frameClassName: string;
};

export const FAN_UPLOAD_ITEMS: FanUploadItem[] = [
  {
    id: 'image-1',
    type: 'image',
    titleKey: 'imageCard1Title',
    descriptionKey: 'imageCard1Desc',
    railKey: 'imageRail',
    labelKey: 'imageLabel',
    cardClassName: 'from-[#201d18] via-[#383026] to-[#0d0c0a]',
    accentClassName: 'from-[#f5d096]/60 via-[#f8f0d4]/25 to-transparent',
    frameClassName: 'border-[#f0c36b]/40 bg-[radial-gradient(circle_at_top,rgba(255,233,190,0.45),transparent_35%),linear-gradient(145deg,rgba(255,255,255,0.22),rgba(255,255,255,0.03))]',
  },
  {
    id: 'image-2',
    type: 'image',
    titleKey: 'imageCard2Title',
    descriptionKey: 'imageCard2Desc',
    railKey: 'imageRail',
    labelKey: 'imageLabel',
    cardClassName: 'from-[#171d24] via-[#273543] to-[#091118]',
    accentClassName: 'from-[#8fc8ff]/60 via-[#dceeff]/20 to-transparent',
    frameClassName: 'border-[#8dbce7]/35 bg-[radial-gradient(circle_at_top,rgba(190,230,255,0.42),transparent_35%),linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03))]',
  },
  {
    id: 'video-1',
    type: 'video',
    titleKey: 'videoCardTitle',
    descriptionKey: 'videoCardDesc',
    railKey: 'videoRail',
    labelKey: 'videoLabel',
    cardClassName: 'from-[#1a1a1a] via-[#241718] to-[#0a0a0a]',
    accentClassName: 'from-primary/60 via-white/10 to-transparent',
    frameClassName: 'border-primary/35 bg-[radial-gradient(circle_at_top,rgba(11,157,181,0.45),transparent_35%),linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03))]',
  },
];
