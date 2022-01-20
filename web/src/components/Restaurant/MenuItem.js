import React from 'react';
import PropTypes from 'prop-types';
import { Box, HStack, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

const RestaurantMenuItem = ({ details, onClick }) => {
  const { t } = useTranslation();
  return (
    <Box borderBottom="1px" borderColor="gray.300" w="100%">
      <HStack
        cursor="pointer"
        w="100%"
        p={2}
        onClick={onClick}
        _hover={{ bg: 'gray.100' }}
      >
        <HStack w="100%">
          <Text fontSize={['10px', '12px', '15px']} fontWeight="normal">{t(details.name)}</Text>
        </HStack>
        <HStack justifyContent="flex-end" w="100%">
          <Text fontSize={['10px', '12px', '15px']} fontWeight="normal">{details.price}$</Text>
          <ChevronRightIcon fontSize={['11px', '13px', '16px']} />
        </HStack>
      </HStack>
    </Box>
  )
}

RestaurantMenuItem.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    optionals: PropTypes.array,
    includes: PropTypes.array,
    sides: PropTypes.array,
    sizeDetails: PropTypes.shape({
      options: PropTypes.array.isRequired,
      sizePriceConstant: PropTypes.number.isRequired
    }),
    types: PropTypes.array
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default RestaurantMenuItem;
