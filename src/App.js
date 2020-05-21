import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-components';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
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
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <BrowserRouter>
          <ViewportProvider>
            <Routes />
          </ViewportProvider>
        </BrowserRouter>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
