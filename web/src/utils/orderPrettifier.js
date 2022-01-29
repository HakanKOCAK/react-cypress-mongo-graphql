import { getDetailsOfObjectLike } from './restaurantMenuPrettifier';
import { isEmpty, cloneDeep } from 'lodash';

export const prettifyCreatedAt = ({ createdAt = '' }) => {
  if (!createdAt) return;

  const date = new Date(createdAt);
  if (!date) return null;

  const days = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const mins = date.getMinutes();

  return `${days}/${month < 10 ? `0${month}` : month}/${year} ${hours < 10 ? `0${hours}` : hours}:${mins < 10 ? `0${mins}` : mins}`;
};

export const restructureOrderItems = (items, t) => {
  const structured = items.map((item) => {
    const data = {};
    data.id = item.id;
    data.name = t(item.name);

    if (item.itemType === 'falafel' || item.itemType === 'pizza') {
      data.name = `${t(data.name)} ${item.itemType}`;
    }

    if (item.sweetType || item.drinkType) {
      const type = item.sweetType || item.drinkType;
      data.name = `${t(data.name)} ${t(type)}`;
    }

    if (item.falafelPieces || item.sideSizeOption) {
      if (item.name !== 'fries') {
        data.pieces = item.falafelPieces || item.sideSizeOption;
      }
    } else if (item.pizzaSizeOption || item.sideSizeOption) {
      data.size = item.pizzaSizeOption || item.sideSizeOption
    }

    if (!isEmpty(item.optionals)) {
      data.optionals = Object.keys(item.optionals).map(i => t(i)).join(', ');
    }

    if (!isEmpty(item.selectedMealDetails)) {
      data.selectedMealDetails = item.selectedMealDetails
    }

    data.quantity = item.quantity;
    data.total = item.totalPrice;
    return data;
  })

  return structured;
};

export const prettifyOrderItem = ({ data = {} }) => {
  const prettified = getDetailsOfObjectLike(cloneDeep(data));
  if (isEmpty(prettified.selectedMealDetails)) {
    delete prettified.selectedMealDetails
  }
  return prettified;
};