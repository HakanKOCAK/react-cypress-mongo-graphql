import React from 'react';
import { Box } from '@chakra-ui/react';
import OrderList from '../../components/Order/List';

const Orders = ({ width }) => {
  return (
    <Box w="650px" h="650px" overflowY="scroll" p={3}>
      <OrderList width={width} />
    </Box>
  );
}

export default Orders;
