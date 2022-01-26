import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import Optional from './Optional';
import Meal from './Meal';

const Kebab = ({
  sides,
  meals,
  optionals,
  setOptionals,
  meal,
  setMeal,
  windowWidth
}) => {
  const { t } = useTranslation();

  return (
    <>
      {!isEmpty(sides) && (
        <Box w="100%" alignItems="flex-start" p={1}>
          <Heading fontSize={['12px', '15px', '17px']}>{t('sides')}: <span style={{ fontWeight: 'normal' }}>{sides.map((i) => t(i)).join(', ')}</span></Heading>
        </Box>
      )}
      <Optional
        optionals={optionals}
        setOptionals={setOptionals}
        windowWidth={windowWidth}
      />
      <Meal
        meals={meals}
        selected={meal}
        setSelected={setMeal}
        windowWidth={windowWidth}
      />
    </>
  );
};

Kebab.propTypes = {
  sides: PropTypes.array.isRequired,
  optionals: PropTypes.shape({}).isRequired,
  setOptionals: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
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
  meal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mealPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired
  }).isRequired,
  setMeal: PropTypes.func.isRequired
};

export default Kebab;
