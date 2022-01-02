import React, { useEffect, useState } from 'react';
import { Box, Heading, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import RestaurantMenu from '../../components/Restaurant/Menu';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useLazyQuery } from '@apollo/client';
import { getRestaurantMenuQuery } from '../../graphql/queries';
import prettifyRestaurantMenu from '../../utils/restaurantMenuPrettifier';
import apiUrl from '../../utils/apiUrl';

export const Restaurant = () => {
  const { t } = useTranslation();
  const params = useParams();
  const location = useLocation();
  const { restaurantId } = params;
  const { details } = location.state;
  const [menu, setMenu] = useState({});
  const [getMenu, { data, loading, error }] = useLazyQuery(getRestaurantMenuQuery)

  useEffect(() => {
    if (!isEmpty(details)) {
      getMenu({ variables: { menuId: restaurantId } });
    }
  }, [details, getMenu, restaurantId]);

  useEffect(() => {
    if (!isEmpty(data) && !isEmpty(data.menu)) {
      setMenu(prettifyRestaurantMenu({ menu: data.menu }))
    }
  }, [data, setMenu])

  if (error) {
    console.log(error);
    <Heading size="lg">{t('serverError')}</Heading>
  }

  if (isEmpty(details)) {
    return <Navigate to="/restaurants" state={{ from: location }} />
  }

  const getMenuView = () => {
    if (loading || isEmpty(menu)) {
      return <Spinner color="pink.400" size="md" />
    }

    return <RestaurantMenu details={menu} />
  };

  return (
    <Box display="flex" justifyContent="center">
      <VStack alignItems="flex-start" w="650px">
        <HStack w="100%" spacing={5}>
          <Image
            src={`${apiUrl}/${details.image}`}
            alt={details.image.split('.')[0]}
            boxSize={['50px', '60px', '70px']}
          />
          <VStack w="100%" alignItems="flex-start">
            <Heading fontSize={['15px', '18px', '20px']}>{details.name}</Heading>
            <Text fontSize={['13px', '15px', '18px']}>
              {details.cuisine.join(', ')}
            </Text>
            <HStack w="100%">
              <HStack spacing={0.5}>
                <Text fontSize={['11px', '12px', '14px']} fontWeight="medium">
                  {t('Minimum')}:
                </Text>
                <Text fontSize={['11px', '12px', '14px']}>
                  {details.deliveryDetails.minAmount}$
                </Text>
              </HStack>
              <HStack spacing={0.5}>
                <Text fontSize={['11px', '12px', '14px']} fontWeight="medium">
                  {t('arrivesIn')}:
                </Text>
                <Text fontSize={['11px', '12px', '14px']}>
                  {details.deliveryDetails.estimatedDeliveryTime}{t('min')}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
        <Heading fontSize={['13px', '15px', '18px']} style={{ marginTop: '1.2rem' }}>{t('menu')}</Heading>
        <VStack w="100%" h={['400px', '450px', '550px']} overflowY="scroll">
          {getMenuView()}
        </VStack>
      </VStack>
    </Box>
  )
}
