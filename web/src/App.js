import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
} from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Text>
          Hello.
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
