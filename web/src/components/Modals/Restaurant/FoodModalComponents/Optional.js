import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Heading, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

const Optional = ({
  optionals,
  setOptionals,
  windowWidth
}) => {
  const { t } = useTranslation();

  if (isEmpty(optionals)) {
    return null;
  }
  return (
    <HStack p={1} mt={5} alignItems="flex-start" wrap="wrap">
      <Heading
        fontSize={['12px', '15px', '17px']}
        mt={[0.5, 0.5, 0]}
      >
        {t('optionals')}:
      </Heading>
      {
        Object.entries(optionals).map(([key, value], index) => (
          <Checkbox
            colorScheme="teal"
            key={index}
            data-cy={`food-modal-checkbox-${key}`}
            size={windowWidth > 478 ? 'md' : 'sm'}
            isChecked={value}
            onChange={(e) => {
              setOptionals(key, e.target.checked)
            }}
          >
            {t(key)}
          </Checkbox>
        ))
      }
    </HStack>
  );
};

Optional.propTypes = {
  optionals: PropTypes.shape({}).isRequired,
  setOptionals: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
};

export default Optional;
