import React, { useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  VStack
} from '@chakra-ui/react';
import FoodModal from '../components/Modals/Restaurant/Food';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../cart/CartProvider';
import { useTranslation } from 'react-i18next';
import CartItem from '../components/CartItem';
import CustomAlertDialog from '../components/Modals/CustomAlertDialog';
import { useMutation } from '@apollo/client';
import { deleteCartItemMutation } from '../graphql/mutations';
import { userCartQuery } from '../graphql/queries';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  //This the delete dialog options
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [deletedItemDetails, setDeletedItemDetails] = useState({
    id: -1,
    name: ''
  });

  //This is food modal - update - options.
  const [isFoodModalOpen, setFoodModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [foodModalDetails, setFoodModalDetails] = useState({
    details: {
      itemDetails: {},
      itemType: ''
    }
  });

  //Get cart details and total from CartProvider.js
  const { details, cartTotal } = useCart();

  //Delete mutation -- refetch cart details after completion
  const [deleteCartItem, { loading: isDeleting }] = useMutation(deleteCartItemMutation, {
    refetchQueries: [userCartQuery]
  });


  const handleOnClick = (cartItem) => {
    setFoodModalDetails({ ...cartItem, details: { ...cartItem.item } });
    setUpdateId(cartItem.id);
    setFoodModalOpen(true);
  };

  const handleDelete = async ({ id = '' }) => {
    if (id) {
      try {
        await deleteCartItem({ variables: { itemId: id } });
      } catch (error) {
        console.log(error);
      }
    }

    return setAlertDialogOpen(false);
  };

  const getItemNameForDeleteDialog = (details) => {
    const itemType = details.item.itemType;
    const itemName = details.item.itemDetails.name;
    if (itemType === 'falafel' || itemType === 'pizza') {
      return `${t(itemName)} ${t(itemType)}`;
    } else if (itemType === 'drink') {
      return `${t(itemName)}: ${t(details.drinkType)}`;
    } else if (itemType === 'sweet') {
      return `${t(itemName)}${details.sweetType ? `: ${t(details.sweetType)}` : ''}`;
    }
    return itemName;
  };

  return (
    <Box h="100%">
      <FoodModal
        isOpen={isFoodModalOpen}
        onClose={() => {
          setFoodModalOpen(false);
          setFoodModalDetails({
            details: {
              itemDetails: {},
              itemType: ''
            }
          });
          setUpdateId('');
        }}
        restaurantDetails={details.restaurantDetails}
        updateModal={true}
        updateId={updateId}
        {...foodModalDetails}
      />
      <CustomAlertDialog
        isOpen={isAlertDialogOpen}
        onClose={() => {
          setAlertDialogOpen(false)
        }}
        isSubmitting={isDeleting}
        confirmButtonColorScheme='red'
        dialogBody={t('areYouSureWantToDeleteItemFromBasket')}
        dialogHeader={t(deletedItemDetails.name)}
        onConfirm={() => handleDelete({ id: deletedItemDetails.id })}
        onConfirmText={t('delete')}
      />
      <Button
        display={{ base: 'block', md: 'none' }}
        variant="link"
        mb={2}
        colorScheme="pink"
        onClick={() => navigate('/restaurants')}
      >
        <ArrowBackIcon />
        {t('restaurants')}
      </Button>
      <Box display="flex" h="100%" justifyContent="center">
        <Box
          position="relative"
          w="650px"
          h="100%"
        >
          <Heading
            fontSize={['14px', '16px', '18px']}
          >{t('cartDetails')}</Heading>
          {
            details.restaurantDetails.id ? (
              <>
                <HStack
                  position="relative"
                  borderBottom="1px"
                  borderBottomColor="gray.200"
                >
                  <VStack p={1} spacing={1.5} alignItems="flex-start">
                    <Button
                      variant="link"
                      colorScheme="teal"
                      fontSize={['12px', '14px', '16px']}
                      fontWeight="semibold"
                      onClick={() => navigate(`/restaurants/${details.restaurantDetails.id}`, { state: { details: details.restaurantDetails, from: location } })}
                    >
                      {t('restaurant')}: <span style={{ marginLeft: 3, fontWeight: 'lighter' }}>{details.restaurantDetails.name}</span>
                    </Button>
                    <Heading fontSize={['12px', '14px', '16px']} fontWeight="semibold">
                      {t('location')}: <span style={{ fontWeight: 'lighter' }}>{details.restaurantDetails.city}, {details.restaurantDetails.county}</span>
                    </Heading>
                  </VStack>
                  <Button
                    position="absolute"
                    right={2}
                    fontSize={['12px', '14px', '16px']}
                    colorScheme="teal"
                  >
                    {`${t('checkout')}: $${cartTotal.toFixed(2)}`}
                  </Button>
                </HStack>
                <Box
                  w="100%"
                  h={['480px', '520px', '600px']}
                  overflowY="scroll"
                  p={2}
                >
                  {details.items.map((cartItem) => (
                    <CartItem
                      key={cartItem.id}
                      details={cartItem}
                      onClick={() => handleOnClick(cartItem)}
                      onDelete={() => {
                        setDeletedItemDetails({
                          id: cartItem.id,
                          name: getItemNameForDeleteDialog(cartItem)
                        });

                        return setAlertDialogOpen(true);
                      }}
                    />
                  ))}
                </Box>
              </>
            ) : (
              <Center mt={10} justifyContent="flex-start" alignItems="center">
                <Heading fontSize={['13px', '15px', '17px']} fontWeight="semibold">{t('noItemsInTheCart')}</Heading>
              </Center>
            )
          }
        </Box>
      </Box >
    </Box >
  );
};

export default Cart;
