import { Video } from './videos.entity';

export const videossProvider = [
  {
    provide: 'VIDEOS_REPOSITORY',
    useValue: Video,
  },
];