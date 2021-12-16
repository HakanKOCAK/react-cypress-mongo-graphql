import React from 'react';
import { Box } from '@chakra-ui/react';
import CreditCardList from '../../components/CreditCard/List';

const CreditCards = () => {
  return (
    <Box w="650px" h="650px" overflowY="scroll" p={3}>
      <CreditCardList />
    </Box>
  );
}

export default CreditCards
