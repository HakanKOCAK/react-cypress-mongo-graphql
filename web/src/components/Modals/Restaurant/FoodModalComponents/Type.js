import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const Type = ({
  selected,
  setSelected,
  types,
  windowWidth
}) => {
  const { t } = useTranslation();

  if (isEmpty(types)) {
    return null;
  }

  return (
    <Box w="100%" alignItems="flex-start" p={1} mt={5}>
      <HStack alignItems="flex-start">
        <Heading fontSize={['12px', '15px', '17px']} mt={[1, 0.5, 0]}>{t('option')}:</Heading>
        <RadioGroup
          value={selected}
          onChange={(value) => setSelected(value)}
        >
          <HStack spacing={2} wrap="wrap">
            {types.map((item, index) => (
              <Radio
                size={windowWidth > 478 ? 'md' : 'sm'}
                key={index}
                value={item}
                colorScheme="teal"
              >
                {t(item)}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      </HStack>
    </Box>
  );
};

Type.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  types: PropTypes.array.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

export default Type;
