import React from 'react';
import { createRoot } from 'react-dom/client'
import GlobalStyles from './styles';
import Pages from './pages';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const root = createRoot(document.getElementById('root'));

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  cache: new InMemoryCache()
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Pages />
    </ApolloProvider>
  </React.StrictMode>
);
