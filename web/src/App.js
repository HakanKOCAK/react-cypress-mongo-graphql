import React from 'react';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import TokenProvider from './auth/TokenProvider';
import CustomApolloProvider from './CustomApolloProvider';
import Routes from './Routing/Routes';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TokenProvider>
        <CustomApolloProvider>
          <Routes />
        </CustomApolloProvider>
      </TokenProvider>
    </ChakraProvider>
  );
}

export default App;
