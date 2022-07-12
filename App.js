/**
 * Mobile Developer
 * https://github.com/legacy-rex0
 * 07068829845
 * legacy.rexio@gmail.com
 * 
 */

import React from 'react';

import Index from './src/routes';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({uri: 'https://delicate-redfish-42.hasura.app/v1/graphql'});


const authLink = new ApolloLink((operation, forward) => {

  operation.setContext({
    headers: {
      "x-hasura-admin-secret":"s8IkThwkBkURoOHFM6myN7bnx3toLzJys1IPqwnqlIhAm2kzoUjyxWWnGIvoy56D",
      "content-type": "application/json"
    }
  });

  return forward(operation);

})

const client = new ApolloClient({
  cache: new InMemoryCache,
  link: authLink.concat(httpLink)
});

const App = () => {

  return (
    <ApolloProvider client={client}>
      <Index/>
    </ApolloProvider>
  );
};


export default App;
