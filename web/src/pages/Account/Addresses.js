import React from 'react';
import AddressList from '../../components/Address/List';
import { Box } from '@chakra-ui/react';

const Addresses = () => {
  return (
    <Box
      w="650px"
      h="650px"
      overflowY="scroll"
      p={3}
    >
      <AddressList />
    </Box>
  );
}



export default Addresses
