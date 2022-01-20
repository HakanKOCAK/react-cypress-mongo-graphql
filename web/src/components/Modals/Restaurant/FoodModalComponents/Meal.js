import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const Meal = ({
  meals,
  selected,
  setSelected,
  windowWidth
}) => {
  const { t } = useTranslation();

  if (isEmpty(meals)) {
    return null;
  }

  return (
    <VStack w="100%" p={1} alignItems="flex-start" mt={5}>
      <Heading fontSize={['12px', '15px', '17px']}>{t('mealOptions')}:</Heading>
      {
        meals.map((m, index) => (
          <VStack key={index}
            boxShadow="xl"
            rounded="xl"
            bg="gray.50"
            p={2}
            w="100%"
            alignItems="center"
          >
            <HStack w="100%">
              <Heading
                fontSize={['11px', '14px', '16px']}
                fontWeight="semibold"
                mt={[0, 0.5, 0]}
              >
                {m.name}:
              </Heading>
              <Text fontSize={['11px', '14px', '16px']}>{m.includes.map((m) => t(m)).join(', ')}</Text>
            </HStack>
            <HStack w="100%">
              <Heading
                fontSize={['11px', '14px', '16px']}
                fontWeight="semibold"
                mt={[0, 0.5, 0]}
              >
                {t('price')}{`(${t('small')})`}:
              </Heading>
              <Text fontSize={['11px', '14px', '16px']}>{m.priceDetails.price}$</Text>
            </HStack>
            <HStack w="100%">
              <Heading
                fontSize={['11px', '14px', '16px']}
                fontWeight="semibold"
                mt={[0, 0.5, 0]}
              >
                {t('size')}:
              </Heading>
              <Checkbox
                colorScheme="teal"
                onChange={() => setSelected({
                  name: m.name,
                  mealPrice: m.priceDetails.price,
                  sizePriceConstant: m.priceDetails.sizePriceConstant,
                  size: 'small'
                })}
                isChecked={selected.name === m.name && selected.size === 'small'}
                size={windowWidth > 478 ? 'md' : 'sm'}
              >
                {t('small')}
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                onChange={() => setSelected({
                  name: m.name,
                  mealPrice: m.priceDetails.price,
                  sizePriceConstant: m.priceDetails.sizePriceConstant,
                  size: 'medium'
                })}
                isChecked={selected.name === m.name && selected.size === 'medium'}
                size={windowWidth > 478 ? 'md' : 'sm'}
              >
                {t('medium')}
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                onChange={() => setSelected({
                  name: m.name,
                  mealPrice: m.priceDetails.price,
                  sizePriceConstant: m.priceDetails.sizePriceConstant,
                  size: 'large'
                })}
                isChecked={selected.name === m.name && selected.size === 'large'}
                size={windowWidth > 478 ? 'md' : 'sm'}
              >
                {t('large')}
              </Checkbox>
            </HStack>
          </VStack>
        ))
      }
    </VStack>
  );
};

Meal.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape(
    {
      includes: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      priceDetails: PropTypes.shape({
        price: PropTypes.number.isRequired,
        sizePriceConstant: PropTypes.number.isRequired
      })
    }
  )).isRequired,
  selected: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mealPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired
  }).isRequired,
  setSelected: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

export default Meal;
