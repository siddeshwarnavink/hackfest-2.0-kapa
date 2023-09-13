import { UserCommunity } from "./userCommunity.entity";

export const userCommunityProvider = [
    {
        provide: 'USERCOMMUNITY_REPOSITORY',
        useValue: UserCommunity,
    },
];