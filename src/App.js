import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-components';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
// import { InMemoryCache } from 'apollo-cache-inmemory';

import 'typeface-open-sans';
import 'typeface-merriweather';
import 'typeface-josefin-sans';

import 'normalize.css';
import './styles/global.module.scss';

import { ViewportProvider } from './hooks/useViewport';
import Routes from './routes';

const client = new ApolloClient({
  uri: process.env.REACT_APP_SITE_API,
  credentials: 'include',
  // cache: new InMemoryCache(),
});

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
