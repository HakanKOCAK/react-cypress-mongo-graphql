import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, VStack } from '@chakra-ui/react';
import FoodModal from '../Modals/Restaurant/Food';
import RestaurantMenuItem from './MenuItem';
import { useTranslation } from 'react-i18next';

const RestaurantMenu = ({ details, restaurantDetails }) => {
  const { t } = useTranslation();
  const getItemType = (key) => {
    return key.slice(0, key.length - 1);
  };

  //Food modal options.
  const [isFoodModalOpen, setFoodModalOpen] = useState(false);
  const [foodModalDetails, setFoodModalDetails] = useState({
    itemDetails: {},
    itemType: ''
  });

  return (
    <VStack w="100%" h="100%" p={2}>
      <VStack alignItems="flex-start" w="100%">
        <FoodModal
          isOpen={isFoodModalOpen}
          onClose={() => setFoodModalOpen(false)}
          details={foodModalDetails}
          restaurantDetails={restaurantDetails}
        />
        <Box w="100%">
          <Box w="100%" borderBottom="1px" borderColor="gray.500" p={1}>
            <Heading fontSize={['12px', '14px', '17px']} fontWeight="bold">{t('mains')}</Heading>
          </Box>
          {Object.entries(details.mains).map(([key1, value1], index) => (
            <Box w="100%" key={index} mb={2} p={2}>
              <Box w="100%" borderBottom="1px" borderColor="gray.400" p={1}>
                <Heading fontSize={['11px', '13px', '16px']} fontWeight="semibold">{t(key1)}</Heading>
              </Box>
              {Object.entries(value1).map(([key2, value2], index) => (
                <Box w="100%" key={index}>
                  <RestaurantMenuItem details={{ name: key2, ...value2 }} itemType={getItemType(key1)} onClick={() => {
                    const itemDetails = { name: key2, ...value2 };
                    if (details.mealDetails && details.mealDetails[getItemType(key1)]) {
                      itemDetails.mealDetails = details.mealDetails[getItemType(key1)];
                    }

                    if (details.falafelPieceDetails && getItemType(key1) === 'falafel') {
                      itemDetails.falafelPieceDetails = details.falafelPieceDetails;
                    }

                    if (details.pizzaSizeDetails && getItemType(key1) === 'pizza') {
                      itemDetails.pizzaSizeDetails = details.pizzaSizeDetails;
                    }
                    setFoodModalDetails({
                      itemDetails,
                      itemType: getItemType(key1)
                    });
                    return setFoodModalOpen(true);
                  }} />
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
                  <RestaurantMenuItem details={{ name: key, ...value }} itemType='side' onClick={() => {
                    setFoodModalDetails({
                      itemDetails: { name: key, ...value },
                      itemType: 'side'
                    });
                    return setFoodModalOpen(true);
                  }} />
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
                  <RestaurantMenuItem details={{ name: key, ...value }} itemType='drink' onClick={() => {
                    setFoodModalDetails({
                      itemDetails: { name: key, ...value },
                      itemType: 'drink'
                    })
                    return setFoodModalOpen(true);
                  }} />
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
                  <RestaurantMenuItem details={{ name: key, ...value }} itemType='sweet' onClick={() => {
                    setFoodModalDetails({
                      itemDetails: { name: key, ...value },
                      itemType: 'sweet'
                    });
                    return setFoodModalOpen(true);
                  }} />
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
                  <RestaurantMenuItem details={{ name: key, price: value }} itemType='sauce' onClick={() => {
                    setFoodModalDetails({
                      itemDetails: { name: key, price: value },
                      itemType: 'sauce'
                    })
                    return setFoodModalOpen(true);
                  }} />
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
  }).isRequired,
  restaurantDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired
  }).isRequired
};

export default RestaurantMenu
