import { Dispatch, SetStateAction, createContext } from 'react';

interface ICommunity {
    community: string;
    setCommunity: Dispatch<SetStateAction<string>>
    communityName: string;
    setCommunityName: Dispatch<SetStateAction<string>>
};

const communityContext = createContext<ICommunity>({
    community: null,
    communityName: '',
    setCommunity: () => { },
    setCommunityName: () => { },
});

export default communityContext;