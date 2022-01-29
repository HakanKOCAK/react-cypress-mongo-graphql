import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { prettifyCreatedAt } from '../../utils/orderPrettifier';

const Order = ({
  createdAt,
  onClick,
  restaurantDetails,
  total
}) => {
  const { t } = useTranslation();
  return (
    <HStack
      padding={2}
      alignItems="center"
      boxShadow="md"
      cursor='pointer'
      bg='gray.100'
      h={['80px', '85px', '93px']}
      w="100%"
      mb={5}
      onClick={onClick}
    >
      <VStack w="100%" alignItems="flex-start">
        <Heading fontSize={['14px', '16px', '18px']}>{restaurantDetails.name}  <Text as="span" fontSize={['11px', '13px', '15px']} fontWeight="medium">({restaurantDetails.county}, {restaurantDetails.city})</Text></Heading>
        <Text fontSize={['12px', '14px', '16px']} fontWeight="semibold">{t('total')}: <Text as="span" fontWeight="normal">{`$${total.toFixed(2)}`}</Text></Text>
        <Text fontSize={['12px', '14px', '16px']} fontWeight="semibold">{t('orderDate')}: <Text as="span" fontWeight="normal">{prettifyCreatedAt({ createdAt })}</Text></Text>
      </VStack>
      <ChevronRightIcon />
    </HStack >
  );
};

Order.propTypes = {
  createdAt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  restaurantDetails: PropTypes.shape({
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  total: PropTypes.number.isRequired
};

export default Order;
