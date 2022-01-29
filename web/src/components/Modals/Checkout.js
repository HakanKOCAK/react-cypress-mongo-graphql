import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AddressModal from './AddressList';
import CreditCardListModal from './CreditCard/List';
import { isEmpty } from 'lodash';
import { gql, useMutation } from '@apollo/client';
import { emptyCartMutation, orderMutation } from '../../graphql/mutations';
import { useNavigate, useLocation } from 'react-router-dom';
import { userCartQuery } from '../../graphql/queries';

const Checkout = ({
  isOpen,
  cartTotal,
  onClose,
  items,
  restaurantDetails,
  selectedAddress,
  servedAddresses
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  //Listen for window width changes
  const [windowWidth, setWindowWidth] = useState(0);

  //Address modal options 
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [modalSelectedAddress, setModalSelecteddAddress] = useState({});

  //Payment method and credit card details for checkout
  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCardDetails, setCreditCardDetails] = useState({});

  //Credit cart list modal  
  const [isCreditCardModalOpen, setCreditCardModalOpen] = useState(false);

  //Create a new order and it to orders if successfull
  const [newOrder, { loading: ordering }] = useMutation(orderMutation, {
    update: (store, { data: { order } }) => {
      if (!order) {
        return;
      }

      store.modify({
        fields: {
          orders(existing) {
            const newOrder = store.writeFragment({
              data: order,
              fragment: gql`
              fragment Order on Orders {
                creditCard
                deliveryAddress
                id
                items
                restaurantDetails
                total
                type
              }
              `
            });

            return [...existing, newOrder]
          }
        }
      })
    }
  });

  //Clear cart after order is completed. Refetch the cart details
  const [emptyCart, { loading: emptyingCart }] = useMutation(emptyCartMutation, {
    refetchQueries: [userCartQuery]
  });


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)
  }, []);


  useEffect(() => {
    setModalSelecteddAddress(selectedAddress);
  }, [selectedAddress]);

  const handleClose = (redirectToOrders = false) => {
    //Clear modal selections
    setModalSelecteddAddress(selectedAddress);
    setCreditCardDetails({});
    setPaymentMethod('');

    //If new order is created successfully redirect to orders page
    if (redirectToOrders) {
      onClose();
      return navigate('/account/orders', { state: { from: location } })
    }
    return onClose();
  }

  const isCheckoutDisabled = () => {
    //If there is not a selcected payment method or address
    if (!paymentMethod || !modalSelectedAddress.id) {
      return true;
    }

    //If payment method is online but credit card is not selected
    if (paymentMethod === 'online' && isEmpty(creditCardDetails)) {
      return true;
    }

    return false;
  };

  const handleCheckout = async () => {
    try {
      //Create the order
      await newOrder({
        variables: {
          details: {
            items: items.reduce((reduced, item) => {
              const copy = [...reduced];
              const data = {};
              Object.entries(item).forEach(([key, value]) => {
                if (key === 'item') {
                  data.itemType = value.itemType
                  data.name = value.itemDetails.name
                } else {
                  data[key] = value;
                }
              });
              copy.push(data);
              return copy;
            }, []),
            total: cartTotal,
            paymentMethod,
            creditCard: paymentMethod === 'online' ? creditCardDetails.id : '',
            deliveryAddress: selectedAddress.id,
            restaurant: restaurantDetails.id
          }
        }
      });

      //Clear user cart
      await emptyCart();

      return handleClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton onClose={handleClose} />

          <ModalHeader>{t('checkout')}</ModalHeader>

          <ModalBody>
            <AddressModal
              isCheckout={true}
              isOpen={isAddressModalOpen}
              addresses={servedAddresses}
              onClose={() => setAddressModalOpen(false)}
              setSelectedAddress={(item) => {
                setModalSelecteddAddress(item);
                setAddressModalOpen(false);
              }}
              selectedId={modalSelectedAddress.id}
            />
            <CreditCardListModal
              cursor="pointer"
              isOpen={isCreditCardModalOpen}
              setSelected={(item) => setCreditCardDetails(item)}
              selectedId={creditCardDetails.id}
              onClose={() => setCreditCardModalOpen(false)}
            />
            <Heading fontSize={['12px', '14px', '16px']}>
              {t('restaurant')}: <span style={{ marginLeft: 3, fontWeight: 'lighter' }}>{restaurantDetails.name}</span>
            </Heading>

            <Button
              mt={4}
              variant="link"
              colorScheme="teal"
              fontSize={['12px', '14px', '16px']}
              fontWeight="semibold"
              onClick={() => setAddressModalOpen(true)}
            >
              {t('deliveryAddress')}: <span style={{ marginLeft: 3, fontWeight: 'lighter' }}>{modalSelectedAddress.address}</span>
            </Button>

            <VStack
              alignItems="flex-start"
              mt={4}
              border="1px"
              borderRadius="md"
              borderColor="gray.400"
              p={1}
            >
              <Heading fontSize={['12px', '14px', '16px']}>
                {t('paymentMethod')}
              </Heading>

              <RadioGroup value={paymentMethod} onChange={setPaymentMethod} p={2}>
                <VStack alignItems="flex-start">
                  <Radio value="online" size={windowWidth <= 478 ? 'sm' : 'md'}>{t('online')}</Radio>
                  {
                    paymentMethod === 'online' && (
                      <Button
                        mt={4}
                        variant="link"
                        colorScheme="teal"
                        fontSize={['12px', '14px']}
                        fontWeight="semibold"
                        onClick={() => setCreditCardModalOpen(true)}
                      >
                        {
                          creditCardDetails.description ? (
                            <>
                              {t('selectedCreditCard')}: <span style={{ marginLeft: 3, fontWeight: 'lighter' }}>{creditCardDetails.description}</span>
                            </>
                          ) : t('selectACreditCard')
                        }
                      </Button>
                    )
                  }
                  <Radio value="cash" size={windowWidth <= 478 ? 'sm' : 'md'}>{t('cash')}</Radio>
                  <Radio value="cardOnDelivery" size={windowWidth <= 478 ? 'sm' : 'md'}>{t('cardOnDelivery')}</Radio>
                </VStack>
              </RadioGroup>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={5}
              colorScheme="teal"
              isLoading={ordering || emptyingCart}
              onClick={handleCheckout}
              disabled={isCheckoutDisabled()}
            >
              {t('checkout')}: {`$${cartTotal.toFixed(2)}`}
            </Button>
            <Button
              colorScheme="pink"
              w="100px"
              onClick={handleClose}
            >
              {t('close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal >
  )
};

Checkout.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  cartTotal: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array,
  restaurantDetails: PropTypes.shape({
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    cuisine: PropTypes.array.isRequired,
    deliveryDetails: PropTypes.shape({
      estimatedDeliveryTime: PropTypes.number.isRequired,
      minAmount: PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    servedDistricts: PropTypes.array.isRequired
  }),
  selectedAddress: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    county: PropTypes.string,
    district: PropTypes.string,
    flat: PropTypes.number,
    floor: PropTypes.number,
    id: PropTypes.string,
    title: PropTypes.string
  }),
  servedAddresses: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    flat: PropTypes.number.isRequired,
    floor: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }))
};

export default Checkout;
