import { AppProps } from 'next/app';
import { LoadingOverlay, MantineProvider, DEFAULT_THEME } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-chat-elements/dist/main.css';
import 'video-react/dist/video-react.css';

import './app.css';
import useAuth from '@/hooks/useAuth';
import authContext from '@/context/authContext';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps, ...props }: AppProps) {
  const auth = useAuth();
  useEffect(() => {
    auth.init();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          ...DEFAULT_THEME,
          colorScheme: 'dark',
          fontFamily: 'Nunito Sans',
          colors: {
            ...DEFAULT_THEME.colors,
            blue: [
              '#D5FAFF',
              '#AAF2FF',
              '#7EE9FF',
              '#52E1FF',
              '#26D8FF',
              '#09E6FF',
              '#00D6E6',
              '#008BC9',
              '#005EA1',
              '#00347A'
            ],
          },
          primaryColor: 'blue'
        }}
      >
        <Notifications />
        <authContext.Provider value={{
          authData: auth.authData,
          setAuthData: auth.setAuthData
        }}>
          {!auth.loading ? (
            <Component {...pageProps} />
          ) : <LoadingOverlay visible={auth.loading} overlayBlur={100} />}
        </authContext.Provider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}