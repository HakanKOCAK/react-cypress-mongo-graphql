import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  HStack,
  IconButton,
  Text,
  VStack
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getTitleDetails, prettifyCartItem } from '../utils/cartPrettifier';

const CartItem = ({ details, onClick, onDelete, width: windowWidth }) => {
  const { t } = useTranslation();
  const [prettifiedDetails, setPrettifiedDetails] = useState({
    drinkType: '',
    itemType: '',
    mealName: '',
    name: '',
    optionals: [],
    pieces: 0,
    quantity: 0,
    size: '',
    sweetType: '',
    totalPrice: '$0.00'
  });

  useEffect(() => {
    if (!isEmpty((details))) {
      setPrettifiedDetails(prettifyCartItem(details, t))
    }
  }, [details, t]);


  //Get size of delete icon according to viewport width
  const getDeleteIconSize = () => {
    if (windowWidth <= 478) {
      return 'sm';
    }
    if (windowWidth <= 768) {
      return 'md';
    }
    return 'lg';
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    return onDelete();
  };

  return (
    <HStack
      boxShadow="xl"
      rounded="xl"
      bg="gray.50"
      w="100%"
      p={1.5}
      my={2}
      cursor="pointer"
      onClick={onClick}
    >
      <VStack
        w="88%"
        alignItems="flex-start"
        p={0.5}
        spacing={0.5}
      >
        <HStack>
          <Text
            fontWeight="semibold"
            fontSize={['12px', '14px', '16px']}
          >
            {prettifiedDetails.quantity} {t(prettifiedDetails.name)} {t(prettifiedDetails.itemType)}
          </Text>
          {getTitleDetails(prettifiedDetails, t)}
        </HStack>
        {
          prettifiedDetails.mealName && (
            <Text
              fontWeight="semibold"
              fontSize={['12px', '14px', '16px']}
            >
              {t('mealOption')}: <span>{prettifiedDetails.mealName}</span>
            </Text>
          )
        }
        {
          prettifiedDetails.optionals && (
            <Text
              fontWeight="semibold"
              fontSize={['12px', '14px', '16px']}
            >
              {t('optionals')}: <span>{prettifiedDetails.optionals}</span>
            </Text>
          )
        }
        <Text
          fontWeight="semibold"
          fontSize={['12px', '14px', '16px']}
        >
          {prettifiedDetails.totalPrice}
        </Text>
      </VStack>
      <IconButton
        variant="ghost"
        colorScheme="teal"
        fontSize={['17px', '19px', '21px']}
        size={getDeleteIconSize()}
        icon={<EditIcon />}
        data-cy={`cart-item-${prettifiedDetails.name}-edit-button`}
      />
      <IconButton
        variant="ghost"
        colorScheme="teal"
        fontSize={['17px', '19px', '21px']}
        size={getDeleteIconSize()}
        onClick={handleDelete}
        data-cy={`cart-item-${prettifiedDetails.name}-delete-button`}
        icon={<DeleteIcon />}
      />
    </HStack>

  );
};

CartItem.propTypes = {
  details: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    sideSizeOption: PropTypes.string,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  width: PropTypes.number
};

export default CartItem;
