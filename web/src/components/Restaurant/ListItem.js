import React from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  HStack,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import apiUrl from '../../utils/apiUrl';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from '@chakra-ui/icons';

const RestaurantListItem = ({ details }) => {
  const { t } = useTranslation();
  const { image, name, cuisine, deliveryDetails } = details;
  return (
    <HStack
      w="600px"
      spacing={3}
      boxShadow="xl"
      rounded="3xl"
      p={3}
      h="110px"
      bg="gray.100"
      cursor="pointer"
    >
      <Image
        src={`${apiUrl}/${image}`}
        alt={image.split('.')[0]}
        boxSize="70px"
      />
      <VStack w="100%" alignItems="flex-start" h="100%" p={2}>
        <Heading fontSize={['xs', 'md', 'xl']}>{name}</Heading>
        <HStack spacing={1} w="100%">
          <HStack w="95%">
            {cuisine.map((c, index) => (
              <Text
                fontSize={['xs', 'sm', 'sm']}
                key={index}
              >
                {c}{index !== cuisine.length - 1 ? ',' : ''}
              </Text>
            ))}
          </HStack>
          <HStack justifyContent="flex-end">
            <ChevronRightIcon fontSize="lg" />
          </HStack>
        </HStack>
        <HStack w="100%" justifyContent="flex-end">
          <HStack spacing={0.5}>
            <Text fontSize={['9px', '12px', '12px']} fontWeight="semibold">{t('minimum')}:</Text>
            <Text fontSize={['9px', '12px', '12px']}>{deliveryDetails.minAmount}</Text>
            <Text fontSize={['9px', '12px', '12px']}>,</Text>
          </HStack>
          <HStack>
            <Text fontSize={['9px', '12px', '12px']} fontWeight="semibold">{t('arrivesIn')}:</Text>
            <Text fontSize={['9px', '12px', '12px']}>{deliveryDetails.estimatedDeliveryTime} {t('min')}</Text>
          </HStack>
        </HStack>
      </VStack >
    </HStack >
  )
}

RestaurantListItem.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cuisine: PropTypes.array.isRequired,
    deliveryDetails: PropTypes.object.isRequired
  }).isRequired
}

export default RestaurantListItem
