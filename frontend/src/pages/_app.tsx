import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ComponentType } from 'react';
import { OrderContextProvider } from '../contexts/OrderContext';
import Global from '../styles/global';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

type Page = NextPage & {
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

const httpLink = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_PATH}`
})

const wsLink = typeof window !== 'undefined' ? new WebSocketLink({
  uri: `wss://${process.env.NEXT_PUBLIC_PATH}`,
  options: {
    reconnect: true
  },
}) : null

const splitLink = typeof window !== 'undefined' ? split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink!,
  httpLink
) : httpLink

const client = new ApolloClient({
  link: splitLink,
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
