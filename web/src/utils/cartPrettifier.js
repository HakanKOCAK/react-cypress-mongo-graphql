import { Text } from '@chakra-ui/react';
import { getDetailsOfObjectLike } from './restaurantMenuPrettifier';
import { isEmpty } from 'lodash';

const prettifyCart = ({ cart = {} }) => {
  return getDetailsOfObjectLike(cart);
};

export const getTitleDetails = (details, t) => {
  if (details.pieces) {
    return (
      <Text
        fontWeight="semibold"
        fontSize={['12px', '14px', '16px']}
      >
        - {details.pieces} {t('pieces')}
      </Text>
    )
  }

  if (details.size) {
    return (
      <Text
        fontWeight="semibold"
        fontSize={['12px', '14px', '16px']}
      >
        - {t(details.size)}
      </Text>
    );
  }

  if (details.drinkType) {
    return (
      <Text
        fontWeight="semibold"
        fontSize={['12px', '14px', '16px']}
      >
        - {t(details.drinkType)}
      </Text>
    );
  }

  if (details.sweetType) {
    return (
      <Text
        fontWeight="semibold"
        fontSize={['12px', '14px', '16px']}
      >
        - {t(details.sweetType)}
      </Text>
    );
  }

  return null;
};

export const prettifyCartItem = (details, t) => {
  const data = {};

  const getName = () => {
    if (!isEmpty(details.item) && !isEmpty(details.item.itemDetails)) {
      return details.item.itemDetails.name;
    }

    return details.name || '';
  };

  const getItemType = () => {
    if (!isEmpty(details.items)) {
      if (details.item.itemType === 'falafel' || details.item.itemType === 'pizza') {
        return details.item.itemType;
      }
    }

    return details.itemType || '';
  };

  //Prettify incoming details
  data.name = getName();
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

  data.itemType = getItemType();

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

export default prettifyCart;