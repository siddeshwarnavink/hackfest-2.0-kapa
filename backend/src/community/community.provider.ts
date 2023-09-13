import { Community } from "./community.entity";

export const communityProvider = [
  {
    provide: 'COMMUNITY_REPOSITORY',
    useValue: Community,
  },
];