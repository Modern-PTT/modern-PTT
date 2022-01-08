import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from '@apollo/client/utilities';

import './index.css';
import App from './Containers/App';
import reportWebVitals from './reportWebVitals.js';

const url = new URL("/graphql", window.location.href);

// Create an http link:
const httpLink = new HttpLink({
  // uri: 'http://localhost:5000/',
  uri: url.href,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  // uri: `ws://localhost:5000/`,
  uri: url.href.replace("http", "ws"),
  options: { reconnect: true },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({}),
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
