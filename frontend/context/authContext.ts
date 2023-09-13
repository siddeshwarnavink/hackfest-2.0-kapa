import { Dispatch, SetStateAction, createContext } from 'react';

import { IAuthData } from '@/hooks/useAuth';

interface IAuthContext {
    authData: null | IAuthData;
    setAuthData: Dispatch<SetStateAction<IAuthData>>
};

const authContext = createContext<IAuthContext>({
    authData: null,
    setAuthData: () => { }
});

export default authContext;