import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { onError } from '@apollo/client/link/error';
import { logout } from './logout';

export const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN || 'https://ops-cms-gql.vercel.app/';

/* Auth Link */
const httpLink = createHttpLink({
  uri: `${SERVER_DOMAIN}`,
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = Cookies.get('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

/* Log Link */
const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation);
});

const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = new Date() - operation.getContext().start;
    console.log(`operation ${operation.operationName} took ${time} to complete`);
    return data;
  });
});
const logLink = timeStartLink.concat(logTimeLink);

/* Error Link */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const logoutLink = onError(({ graphQLErrors }) => {
  // graphQLErrors.map(({ extensions }) => {
  //   return extensions.response.status === 401 && logout();
  // });
});

const link = from([logLink, logoutLink, errorLink.concat(httpLink)]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
