import React from 'react';
import { Box, Heading, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const Size = ({
  options,
  selected,
  setSelected,
  windowWidth
}) => {
  const { t } = useTranslation();

  if (isEmpty(options)) {
    return null;
  }

  return (
    <Box w="100%" alignItems="flex-start" p={1} mt={5}>
      <HStack>
        <Heading fontSize={['12px', '15px', '17px']}>{t('size')}:</Heading>
        <RadioGroup
          value={selected}
          onChange={(value) => setSelected(value)}
        >
          <HStack spacing={2}>
            {options.map((item, index) => (
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

Size.propTypes = {
  options: PropTypes.array.isRequired,
  windowWidth: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Size;
