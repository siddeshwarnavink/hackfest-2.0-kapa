import { VideoPurchase } from './video-purchase.entity';

export const videosPurchaseProvider = [
  {
    provide: 'VIDEOSPURCHASE_REPOSITORY',
    useValue: VideoPurchase,
  },
];