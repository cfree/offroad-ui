import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-components';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
// import { InMemoryCache } from 'apollo-cache-inmemory';

import 'typeface-open-sans';
import 'typeface-merriweather';
import 'typeface-josefin-sans';

// TODO
import './styles/global.module.scss';

import Routes from './routes';
import { endpoint } from './lib/constants';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? endpoint : process.env.SITE_API,
  credentials: 'include',
  // cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
