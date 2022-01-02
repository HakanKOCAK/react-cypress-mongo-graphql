import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, VStack } from '@chakra-ui/react';
import RestaurantMenuItem from './MenuItem';
import { useTranslation } from 'react-i18next';

const RestaurantMenu = ({ details }) => {
  const { t } = useTranslation();
  const getItemType = (key) => {
    return key.slice(0, key.length - 1);
  };

  return (
    <VStack w="100%" h="100%" p={2}>
      <VStack alignItems="flex-start" w="100%">
        <Box w="100%">
          <Box w="100%" borderBottom="1px" borderColor="gray.500" p={1}>
            <Heading fontSize={['12px', '14px', '17px']} fontWeight="bold">{t('mains')}</Heading>
          </Box>
          {Object.entries(details.mains).map(([key1, value], index) => (
            <Box w="100%" key={index} mb={2} p={2}>
              <Box w="100%" borderBottom="1px" borderColor="gray.400" p={1}>
                <Heading fontSize={['11px', '13px', '16px']} fontWeight="semibold">{t(key1)}</Heading>
              </Box>
              {Object.entries(value).map(([key2, value], index) => (
                <Box w="100%" key={index}>
                  <RestaurantMenuItem details={{ name: key2, ...value }} itemType={getItemType(key1)} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        {
          details.sides && (
            <Box w="100%" style={{ marginBottom: '1.2rem' }}>
              <Box w="100%" borderBottom="1px" borderColor="gray.500" p={1}>
                <Heading fontSize={['12px', '14px', '17px']}>{t('sides')}</Heading>
              </Box>
              {Object.entries(details.sides).map(([key, value], index) => (
                <Box w="100%" key={index}>
                  <RestaurantMenuItem details={{ name: key, ...value }} itemType='side' />
                </Box>
              ))}
            </Box>
          )
        }

        {
          details.drinks && (
            <Box w="100%" style={{ marginBottom: '1.2rem' }}>
              <Box w="100%" borderBottom="1px" borderColor="gray.500" p={1}>
                <Heading fontSize={['12px', '14px', '17px']}>{t('drinks')}</Heading>
              </Box>
              {Object.entries(details.drinks).map(([key, value], index) => (
                <Box w="100%" key={index}>
                  <RestaurantMenuItem details={{ name: key, ...value }} itemType='drink' />
                </Box>
              ))}
            </Box>
          )
        }


        {
          details.sweets && (
            <Box w="100%" style={{ marginBottom: '1.2rem' }}>
              <Box w="100%" borderBottom="1px" borderColor="gray.500" p={1}>
                <Heading fontSize={['12px', '14px', '17px']}>{t('sweets')}</Heading>
              </Box>
              {Object.entries(details.sweets).map(([key, value], index) => (
                <Box w="100%" key={index}>
                  <RestaurantMenuItem details={{ name: key, ...value }} itemType='sweet' />
                </Box>
              ))}
            </Box>
          )
        }


        {
          details.sauces && (
            <Box w="100%">
              <Box w="100%" borderBottom="1px" borderColor="gray.500" p={1}>
                <Heading fontSize={['12px', '14px', '17px']}>{t('sauces')}</Heading>
              </Box>
              {Object.entries(details.sauces).map(([key, value], index) => (
                <Box w="100%" key={index}>
                  <RestaurantMenuItem details={{ name: key, price: value }} itemType='sauce' />
                </Box>
              ))}
            </Box>
          )
        }
      </VStack>
    </VStack >
  )
}

RestaurantMenu.propTypes = {
  details: PropTypes.shape({
    mains: PropTypes.shape({
      kebabs: PropTypes.object,
      hamburgers: PropTypes.object,
      pizzas: PropTypes.object,
      falafels: PropTypes.object
    }).isRequired,
    drinks: PropTypes.object,
    sauces: PropTypes.object,
    sides: PropTypes.object,
    sweets: PropTypes.object
  }).isRequired
};

export default RestaurantMenu
