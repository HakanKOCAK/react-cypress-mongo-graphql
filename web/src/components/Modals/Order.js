import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { prettifyCreatedAt, restructureOrderItems } from '../../utils/orderPrettifier';

const Order = ({
  isOpen,
  details,
  onClose
}) => {
  const { t } = useTranslation();
  const {
    createdAt,
    creditCard,
    deliveryAddress,
    items,
    paymentMethod,
    restaurantDetails,
    total
  } = details;

  const displayOrderItem = (item) => {
    const display = (key, val, index) => {
      if (key === 'selectedMealDetails') {
        return (
          <Heading
            key={index}
            fontSize={['13px', '15px', '17px']}
            fontWeight="semibold"
          >
            {t('mealOption')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{t(val.size)} {val.name}</Text>, {t('price')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{`$${val.totalPrice.toFixed(2)}`}</Text>
          </Heading>
        );
      } else if (!['id', 'name', 'total'].includes(key)) {
        return (
          <Heading
            key={index}
            fontSize={['13px', '15px', '17px']}
            fontWeight="semibold"
          >
            {t(key)}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{val}</Text>
          </Heading>
        );
      }

      return null;
    }
    return (
      <VStack
        key={item.id}
        w="100%"
        spacing={1}
        alignItems="flex-start"
        p={2}
        borderBottom="1px"
        borderColor="gray.100"
      >
        <Heading fontSize={['13px', '15px', '17px']} fontWeight="semibold">{item.name}</Heading>
        {Object.entries(item).map(([key, value], index) => display(key, value, index))}
        <Heading
          fontSize={['13px', '15px', '17px']}
          w="100%"
          textAlign="right"
        >
          {t('total')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{`$${item.total.toFixed(2)}`}</Text>
        </Heading>
      </VStack>
    )
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>{t('orderDetails')}</ModalHeader>

          <ModalBody>
            <Heading fontSize={['13px', '15px', '17px']}>
              {t('restaurant')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="semibold">{restaurantDetails.name} <Text as="span" fontSize={['11px', '13px', '15px']} fontWeight="normal">({restaurantDetails.city}, {restaurantDetails.county})</Text></Text>
            </Heading>

            <Heading fontSize={['13px', '15px', '17px']} mt={2}>
              {t('orderDate')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{prettifyCreatedAt({ createdAt })}</Text>
            </Heading>

            <Heading fontSize={['13px', '15px', '17px']} mt={2}>
              {t('total')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{`$${total.toFixed(2)}`}</Text>
            </Heading>

            <Heading fontSize={['13px', '15px', '17px']} mt={2}>
              {t('paymentMethod')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{t(paymentMethod)}</Text>
            </Heading>
            {
              creditCard && (
                <Heading fontSize={['13px', '15px', '17px']} mt={2}>
                  {t('cardNumber')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{creditCard}</Text>
                </Heading>
              )
            }

            <Box
              w="100%"
              border="1px"
              borderColor="gray.100"
              p={2}
              borderRadius="md"
              mt={4}
              position="relative"
            >
              <Center
                paddingX={2}
                top={-3}
                left="0.2px"
                position="absolute"
                bg="white"
              >
                <Heading fontSize={['13px', '15px', '17px']}>
                  {t('deliveryAddress')}
                </Heading>
              </Center>
              <Heading fontSize={['13px', '15px', '17px']} fontWeight="semibold">
                {t('address')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{deliveryAddress.address}</Text>
              </Heading>
              <Heading fontSize={['13px', '15px', '17px']} fontWeight="semibold" mt={1}>
                {t('district')}, {t('county')}/{t('city')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal"> {deliveryAddress.district}, {deliveryAddress.county}/{deliveryAddress.city}</Text>
              </Heading>
              <HStack mt={1}>
                <Heading fontSize={['12px', '14px', '16px']} fontWeight="semibold">
                  {t('floor')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{deliveryAddress.floor}</Text>
                </Heading>
                <Heading fontSize={['12px', '14px', '16px']} fontWeight="semibold">
                  {t('flat')}: <Text as="span" fontSize={['12px', '14px', '16px']} fontWeight="normal">{deliveryAddress.flat}</Text>
                </Heading>
              </HStack>
            </Box>

            <Box
              w="100%"
              border="1px"
              borderColor="gray.100"
              p={2}
              borderRadius="md"
              mt={4}
              position="relative"
            >
              <Center
                top={-3}
                left="0.2px"
                paddingX={2}
                position="absolute"
                bg="white"
              >
                <Heading fontSize={['13px', '15px', '17px']}>
                  {t('items')}
                </Heading>
              </Center>
              {restructureOrderItems(items, t).map((i) => displayOrderItem(i))}
            </Box>

          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="pink"
              w="100px"
              onClick={onClose}
            >
              {t('close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal >
  )
};

Order.propTypes = {
  details: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    creditCard: PropTypes.string,
    deliveryAddress: PropTypes.shape({
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      district: PropTypes.string.isRequired,
      flat: PropTypes.number.isRequired,
      floor: PropTypes.number.isRequired
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      drinkType: PropTypes.string,
      falafelPieces: PropTypes.number,
      id: PropTypes.string.isRequired,
      itemType: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      optionals: PropTypes.shape({
        basil: PropTypes.bool,
        greenPeppers: PropTypes.bool,
        ham: PropTypes.bool,
        ketchup: PropTypes.bool,
        lettuce: PropTypes.bool,
        mayonnaise: PropTypes.bool,
        mushrooms: PropTypes.bool,
        mustard: PropTypes.bool,
        onions: PropTypes.bool,
        pickles: PropTypes.bool,
        redOnion: PropTypes.bool,
        tomatoes: PropTypes.bool,
        sweetCorn: PropTypes.bool
      }),
      pizzaSizeOption: PropTypes.string,
      quantity: PropTypes.number.isRequired,
      selectedMealDetails: PropTypes.shape({
        mealPrice: PropTypes.number,
        name: PropTypes.string,
        size: PropTypes.string,
        totalPrice: PropTypes.number
      }),
      sideSizeOption: PropTypes.string,
      sweetType: PropTypes.string,
      totalPrice: PropTypes.number.isRequired
    })).isRequired,
    paymentMethod: PropTypes.string.isRequired,
    restaurantDetails: PropTypes.shape({
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Order;
