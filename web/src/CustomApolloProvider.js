import React, { useMemo, useRef } from 'react'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { useToken } from './auth/TokenProvider'
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import apiUrl from './utils/apiUrl';


const CustomApolloProvider = (props) => {
  const { accessToken, setAccessToken } = useToken();
  const tokenRef = useRef();
  tokenRef.current = accessToken || ''

  const client = useMemo(() => {
    //Set authorization header of outgoing requests with the token provided from ./auth/TokenProvider
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : ''
        }
      }
    });


    const httpLink = new HttpLink({
      uri: `${apiUrl}/graphql`,
      credentials: 'include'
    });

    return new ApolloClient({
      link: ApolloLink.from([
        //This parts checks if access token expired or is not exists 
        // and tries to get a new one before each outgoing requests
        new TokenRefreshLink({
          accessTokenField: 'accessToken',
          isTokenValidOrUndefined: () => {
            //Check if token is not exists
            if (!tokenRef) {
              return true;
            }

            if (!tokenRef.current) {
              return true;
            }

            //Check if expired
            try {
              const { exp } = jwtDecode(tokenRef.current);

              if (Date.now() >= exp * 1000) {
                return false;
              }

              return true;
            } catch (error) {
              return false;
            }
          },
          fetchAccessToken: async () => {
            //Fetches new access token
            return fetch(`${apiUrl}/refresh_token`, {
              method: 'POST',
              credentials: 'include'
            });
          },
          handleFetch: accessToken => {
            //Sets new access token using the function imported from ./auth/TokenProvider
            setAccessToken(accessToken);
          },
          handleError: (error) => {
            console.warn('Invalid refresh token.');
            console.error(error);
          }
        }),
        authLink.concat(httpLink),
      ]),
      cache: new InMemoryCache({})
    });

  }, [setAccessToken]);


  return <ApolloProvider client={client} {...props} />;
}

export default CustomApolloProvider
