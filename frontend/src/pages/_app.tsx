import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ComponentType } from 'react';
import { OrderContextProvider } from '../contexts/OrderContext';
import Global from '../styles/global';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

type Page = NextPage & {
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: Props) {
  const CustomLayout = Component.layout ? Component.layout : React.Fragment;
  return (
    <>
      <ApolloProvider client={client}>
        <OrderContextProvider>
          <Global />
          <CustomLayout>
            <Component {...pageProps} />
          </CustomLayout>
        </OrderContextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
