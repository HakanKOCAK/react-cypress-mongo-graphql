import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import OrderModal from '../Modals/Order';
import Order from './Order';
import { useTranslation } from 'react-i18next';
import { ordersQuery } from '../../graphql/queries';
import { isEmpty } from 'lodash';
import { prettifyOrderItem } from '../../utils/orderPrettifier';

const List = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(ordersQuery);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({
    createdAt: '',
    creditCard: '',
    deliveryAddress: {
      address: '',
      city: '',
      county: '',
      district: '',
      flat: -1,
      floor: -1
    },
    items: [],
    paymentMethod: '',
    restaurantDetails: {
      city: '',
      county: '',
      name: ''
    },
    total: 0
  });


  if (error) {
    console.log(error);
    return (
      <Box textAlign="center">
        <Heading size="lg">{t('serverError')}</Heading>
      </Box>
    );
  }

  if (loading) {
    return (
      <Center h="60%">
        <Spinner color="pink.500" size="lg" />
      </Center>
    );
  }

  const getBody = () => {
    if (isEmpty(data) || isEmpty(data.orders)) {
      return (
        <Heading size="md" textAlign="center">
          {t('youDontHaveAnyOrders')}
        </Heading>
      );
    }

    return (
      <>
        <Heading
          textAlign="center"
          fontSize={['14px', '16px', '18px']}
          fontWeight="semibold"
          mb={3}
        >
          {t('myOrders')}
        </Heading>
        <OrderModal
          isOpen={isOrderModalOpen}
          details={selectedOrderDetails}
          onClose={() => setOrderModalOpen(false)}
        />
        {
          data.orders.map((item) => (
            <Order
              key={item.id}
              createdAt={item.createdAt}
              onClick={() => {
                setSelectedOrderDetails({ ...item, items: item.items.map((i) => prettifyOrderItem({ data: i })) });
                return setOrderModalOpen(true);
              }}
              restaurantDetails={item.restaurantDetails}
              total={item.total}
            />
          ))
        }
      </>
    )
  };

  return (
    <>
      {getBody()}
    </>
  );
};

export default List;
