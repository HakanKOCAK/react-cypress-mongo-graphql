import React from 'react';
import { Box } from '@chakra-ui/react';
import OrderList from '../../components/Order/List';

const Orders = () => {
  return (
    <Box w="650px" h="650px" overflowY="scroll" p={3}>
      <OrderList />
    </Box>
  );
}

export default Orders;
