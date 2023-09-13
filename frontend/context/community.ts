import { Dispatch, SetStateAction, createContext } from 'react';

interface ICommunity {
    community: string;
    setCommunity: Dispatch<SetStateAction<string>>
};

const communityContext = createContext<ICommunity>({
    community: null,
    setCommunity: () => { }
});

export default communityContext;