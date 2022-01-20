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

const CartItem = ({ details, onClick, onDelete }) => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(0);
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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)
  }, []);

  useEffect(() => {
    const prettify = () => {
      const data = {};

      //Prettify incoming details
      data.name = details.item.itemDetails.name;
      data.quantity = details.quantity;
      data.totalPrice = `$${details.totalPrice.toFixed(2)}`;

      if (details.falafelPieces) {
        data.pieces = details.falafelPieces;
      }

      if (details.drinkType) {
        data.drinkType = details.drinkType;
      }

      if (details.sweetType) {
        data.sweetType = details.sweetType;
      }

      if (details.item.itemType === 'falafel' || details.item.itemType === 'pizza') {
        data.itemType = details.item.itemType;
      }

      if (details.selectedMealDetails && details.selectedMealDetails.name) {
        data.mealName = details.selectedMealDetails.name;
      }

      if (details.optionals) {
        data.optionals = Object.keys(details.optionals).map((i) => t(i)).join(', ');
      }

      if (details.sideSizeOption) {
        data.size = details.sideSizeOption;
      }

      if (details.pizzaSizeOption) {
        data.size = details.pizzaSizeOption;
      }

      return data;
    };

    if (!isEmpty((details))) {
      setPrettifiedDetails(prettify())
    }
  }, [details, t]);

  const getTitleDetails = () => {
    if (prettifiedDetails.pieces) {
      return (
        <Text
          fontWeight="semibold"
          fontSize={['12px', '14px', '16px']}
        >
          - {prettifiedDetails.pieces} {t('pieces')}
        </Text>
      )
    }

    if (prettifiedDetails.size) {
      return (
        <Text
          fontWeight="semibold"
          fontSize={['12px', '14px', '16px']}
        >
          - {t(prettifiedDetails.size)}
        </Text>
      );
    }

    if (prettifiedDetails.drinkType) {
      return (
        <Text
          fontWeight="semibold"
          fontSize={['12px', '14px', '16px']}
        >
          - {t(prettifiedDetails.drinkType)}
        </Text>
      );
    }

    if (prettifiedDetails.sweetType) {
      return (
        <Text
          fontWeight="semibold"
          fontSize={['12px', '14px', '16px']}
        >
          - {t(prettifiedDetails.sweetType)}
        </Text>
      );
    }

    return null;
  };

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
          {getTitleDetails()}
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
      />
      <IconButton
        variant="ghost"
        colorScheme="teal"
        fontSize={['17px', '19px', '21px']}
        size={getDeleteIconSize()}
        onClick={handleDelete}
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
  onDelete: PropTypes.func.isRequired
};

export default CartItem;
