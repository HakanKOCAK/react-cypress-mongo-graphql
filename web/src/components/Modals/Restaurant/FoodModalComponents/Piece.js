import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const Piece = ({
  pieces,
  selected,
  setSelected,
  windowWidth
}) => {
  const { t } = useTranslation();

  if (isEmpty(pieces)) {
    return null;
  }

  return (
    <Box w="100%" alignItems="flex-start" p={1} mt={5}>
      <HStack>
        <Heading fontSize={['12px', '15px', '17px']}>{t('pieces')}:</Heading>
        <RadioGroup
          value={selected}
          onChange={(value) => setSelected(value)}
        >
          <HStack spacing={5}>
            {pieces.map((item, index) => (
              <Radio
                size={windowWidth > 478 ? 'md' : 'sm'}
                key={index}
                value={item.toString()}
                colorScheme="teal"
              >
                {item}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      </HStack>
    </Box>
  );
};

Piece.propTypes = {
  pieces: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

export default Piece;
