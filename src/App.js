import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Toaster } from 'react-hot-toast';

import { ApolloProvider } from '@apollo/react-components';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import 'typeface-open-sans';
import 'typeface-merriweather';
import 'typeface-josefin-sans';

import 'normalize.css';
import './styles/global.module.scss';

import { ViewportProvider } from './hooks/useViewport';
import Routes from './routes';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_SITE_API,
      credentials: 'include',
    }),
  ]),
  credentials: 'include',
  cache: new InMemoryCache(),
});

// class DebugRouter extends BrowserRouter {
//   constructor(props) {
//     super(props);
//     console.log('initial history is: ', JSON.stringify(this.history, null, 2));
//     this.history.listen((location, action) => {
//       console.log(
//         `The current URL is ${location.pathname}${location.search}${location.hash}`,
//       );
//       console.log(
//         `The last navigation action was ${action}`,
//         JSON.stringify(this.history, null, 2),
//       );
//     });
//   }
// }

const App = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn:
        'https://c97b7370c6de41f09e5a1d9c079682f5@o461685.ingest.sentry.io/5463792',
    });
  }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <BrowserRouter>
          <ViewportProvider>
            <>
              <Routes />
              <Toaster position="top-right" />
            </>
          </ViewportProvider>
        </BrowserRouter>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
