import React from 'react';
import { Box } from '@chakra-ui/react';
import CreditCardList from '../../components/CreditCard/List';

const CreditCards = ({ width }) => {
  return (
    <Box w="650px" h="650px" overflowY="scroll" p={3}>
      <CreditCardList width={width} />
    </Box>
  );
}

export default CreditCards
