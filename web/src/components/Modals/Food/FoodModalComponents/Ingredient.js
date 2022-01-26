import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const Ingredient = ({ ingredients = [] }) => {
  const { t } = useTranslation();

  if (isEmpty(ingredients)) return null;
  return (
    <Box w="100%" alignItems="flex-start" p={1}>
      <Heading fontSize={['12px', '15px', '17px']}>{t('ingredients')}: <span style={{ fontWeight: 'normal' }}>{ingredients.map((i) => t(i)).join(', ')}</span></Heading>
    </Box>
  );
}

Ingredient.propTypes = {
  ingredients: PropTypes.array.isRequired
}

export default Ingredient
