import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalFooter,
  Button,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { isEmpty } from 'lodash';
import Falafel from './FoodModalComponents/Falafel';
import Side from './FoodModalComponents/Side';
import Drink from './FoodModalComponents/Drink';
import Sweet from './FoodModalComponents/Sweet';
import Kebab from './FoodModalComponents/Kebab';
import Hamburger from './FoodModalComponents/Hamburger';
import Pizza from './FoodModalComponents/Pizza';
import CustomAlertDialog from '../CustomAlertDialog';
import { useMutation } from '@apollo/client';
import { addCartItemMutation, updateCartItemMutation } from '../../../graphql/mutations';
import { userCartQuery } from '../../../graphql/queries';

const Food = ({
  details: { itemDetails, itemType },
  drinkType,
  falafelPieces,
  isOpen,
  onClose,
  optionals,
  pizzaSizeOption,
  quantity,
  restaurantDetails,
  selectedMealDetails,
  sideSizeOption,
  sweetType,
  updateId,
  updateModal
}) => {
  const { t } = useTranslation();

  //add cart item mutation -- refetch cart details if successfull
  const [addCartItem] = useMutation(addCartItemMutation, {
    refetchQueries: [
      userCartQuery
    ]
  });

  //update cart item mutation -- refetch cart details if successfull
  const [updateCartItem] = useMutation(updateCartItemMutation, {
    refetchQueries: [
      userCartQuery
    ]
  });

  //To set window width dynamically
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Quantity selected from modal
  const [modalQuantity, setModalQuantity] = useState(1);

  //Base price of dipslayed item -- will change based on size, pieces etc.
  const [basePrice, setBasePrice] = useState(0);

  //Selected falafel pieces from modal
  const [modalFalafelPieces, setModalFalafelPieces] = useState(0);

  //Selected side size from modal
  const [modalSideSizeOption, setModalSideSizeOption] = useState('');

  //Selected pizza size from modal
  const [modalPizzaSizeOption, setModalPizzaSizeOption] = useState('');

  //Total price of modal
  const [modalTotalPrice, setModalTotalPrice] = useState(0);

  //Selected drink type of modal
  const [modalDrinkType, setModalDrinkType] = useState('');

  //Selected sweet type of modal
  const [modalSweetType, setModalSweetType] = useState('');

  //Selected optional details of modal
  const [modalOptionals, setModalOptionals] = useState({});

  //Default meal details
  const defaultMealSelection = {
    mealPrice: 0,
    totalPrice: 0,
    size: '',
    name: ''
  }

  //Selected meal details of modal
  const [modalSelectedMealDetails, setModalSelectedMealDetails] = useState(defaultMealSelection);

  //To set different restaurant item modal
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const clearModalSelections = () => {
    //Clear modal details onclose
    setModalQuantity(1);
    setBasePrice(0);
    setModalFalafelPieces(0);
    setModalSideSizeOption('');
    setModalPizzaSizeOption('');
    setModalTotalPrice(0);
    setModalDrinkType('');
    setModalSweetType('');
    setModalOptionals({});
    setModalSelectedMealDetails(defaultMealSelection);
  };

  useEffect(() => {
    //This is to set optionals when modal is opened
    const setOptns = (options) => {
      const optns = {};
      options.forEach((opt) => {
        //If it modal is opened for update set every optional of menu item false true for new item
        optns[opt] = updateModal ? false : true;
      })

      //If custom optionals are sent as prop -> meaning it is an update modal set selected ones as true
      if (!isEmpty(optionals)) {
        Object.keys(optionals).forEach((key) => {
          optns[key] = true;
        })
      }

      return optns;
    };

    //Check if item details exists
    if (!isEmpty(itemDetails)) {
      //Set optionals
      setModalOptionals(!isEmpty(itemDetails.optionals) ? setOptns(itemDetails.optionals) : {});

      //If it for item update
      if (updateModal) {
        //Set base price according to selected size/piece details...
        const handleBasePrice = () => {
          let basePrice = itemDetails.price;
          if (itemType === 'falafel') {
            const indexOfSelectedValue = itemDetails.falafelPieceDetails.pieces.indexOf(falafelPieces);
            basePrice = (itemDetails.price) + indexOfSelectedValue * itemDetails.falafelPieceDetails.sizePriceConstant;
          } else if (itemType === 'side') {
            basePrice = (itemDetails.price) + itemDetails.sizeDetails.options.indexOf(sideSizeOption) * itemDetails.sizeDetails.sizePriceConstant;
          } else if (itemType === 'pizza') {
            basePrice = (itemDetails.price) + itemDetails.pizzaSizeDetails.sizes.indexOf(pizzaSizeOption) * itemDetails.pizzaSizeDetails.sizePriceConstant;
          }
          return basePrice;
        };
        setBasePrice(handleBasePrice());
      } else {
        //If modal is for new item set pieces/size for the lowest one
        //for instance pieces = [3, 5, 7], sizes =['small', 'medium', 'large']
        if (itemType === 'falafel') {
          setModalFalafelPieces(itemDetails.falafelPieceDetails.pieces[0]);
        } else if (itemType === 'side') {
          setModalSideSizeOption(itemDetails.sizeDetails.options[0]);
        } else if (itemType === 'pizza') {
          setModalPizzaSizeOption(itemDetails.pizzaSizeDetails.sizes[0]);
        }
        setBasePrice(itemDetails.price);
      }

    }
  }, [itemDetails, itemType, optionals, updateModal, falafelPieces, sideSizeOption, pizzaSizeOption]);

  useEffect(() => {
    //On quantity change also applies for update modal
    if (quantity > 0) {
      setModalQuantity(quantity);
    }
  }, [quantity]);

  useEffect(() => {
    //On falafelPieces change also applies for update modal
    if (falafelPieces > 0) {
      setModalFalafelPieces(falafelPieces);
    }
  }, [falafelPieces]);

  useEffect(() => {
    //On sideSizeOption change also applies for update modal
    if (sideSizeOption) {
      setModalSideSizeOption(sideSizeOption);
    }
  }, [sideSizeOption]);

  useEffect(() => {
    //On pizzaSizeOption change also applies for update modal
    if (pizzaSizeOption) {
      setModalPizzaSizeOption(pizzaSizeOption);
    }
  }, [pizzaSizeOption]);

  useEffect(() => {
    //On drinkType change also applies for update modal
    if (drinkType) {
      setModalDrinkType(drinkType);
    }
  }, [drinkType]);

  useEffect(() => {
    //On sweetType change also applies for update modal
    if (sweetType) {
      setModalSweetType(sweetType);
    }
  }, [sweetType]);

  useEffect(() => {
    //If there is a selected meal details passed as prop
    if (
      !isEmpty(selectedMealDetails) &&
      selectedMealDetails.name &&
      selectedMealDetails.mealPrice > 0 &&
      selectedMealDetails.totalPrice > 0 &&
      selectedMealDetails.size
    ) {
      setModalSelectedMealDetails(selectedMealDetails);
    }
  }, [selectedMealDetails]);

  useEffect(() => {
    //This to calculate totalprice based to base price and selected meal details.
    let modalTotalPrice = modalQuantity * basePrice; // quantity * price

    //Add meal price if exists
    if (modalSelectedMealDetails.name && modalSelectedMealDetails.totalPrice > 0) {
      modalTotalPrice = (basePrice + modalSelectedMealDetails.totalPrice) * modalQuantity;
    }
    setModalTotalPrice(modalTotalPrice);

  }, [modalQuantity, basePrice, modalSelectedMealDetails]);


  //This is to handle base meal selection
  const handleMealSelection = ({ name = '', mealPrice = 0, sizePriceConstant = 0, size = 'small' }) => {
    //map string to int
    const sizeMap = { small: 0, medium: 1, large: 2 };

    //if there is not a change on meal selection return default meal selection
    if (modalSelectedMealDetails.size === size && modalSelectedMealDetails.name === name) {
      return setModalSelectedMealDetails({
        name: '',
        mealPrice: 0,
        totalPrice: 0,
        size: ''
      });
    }

    //return updated meal selection
    return setModalSelectedMealDetails({
      name,
      mealPrice,
      totalPrice: mealPrice + sizePriceConstant * sizeMap[size],
      size
    });
  };

  //Display one of the followings based on the item type
  const getContent = () => {
    if (isEmpty(itemDetails) || !itemType) return null;

    if (itemType === 'falafel') {
      return (
        <Falafel
          ingredients={itemDetails.includes}
          meals={itemDetails.mealDetails || []}
          pieceDetails={itemDetails.falafelPieceDetails}
          setPieces={(value) => {
            setModalFalafelPieces(parseInt(value));
            const indexOfSelectedValue = itemDetails.falafelPieceDetails.pieces.indexOf(parseInt(value));
            const basePrice = (itemDetails.price) + indexOfSelectedValue * itemDetails.falafelPieceDetails.sizePriceConstant;
            setBasePrice(basePrice);
          }}
          pieces={modalFalafelPieces.toString()}
          meal={modalSelectedMealDetails}
          setMeal={(value) => handleMealSelection(value)}
          windowWidth={windowWidth}
        />
      );
    }

    if (itemType === 'side') {
      return (
        <Side
          options={itemDetails.sizeDetails.options}
          selected={modalSideSizeOption}
          setSelected={(value) => {
            setModalSideSizeOption(value);
            const basePrice = (itemDetails.price) + itemDetails.sizeDetails.options.indexOf(value) * itemDetails.sizeDetails.sizePriceConstant;
            setBasePrice(basePrice);
          }}
          name={itemDetails.name}
          windowWidth={windowWidth}
        />
      )
    }

    if (itemType === 'drink') {
      return (
        <Drink
          selected={modalDrinkType}
          setSelected={(value) => setModalDrinkType(value)}
          types={itemDetails.types}
          windowWidth={windowWidth}
        />
      )
    }

    if (itemType === 'sweet') {
      return (
        <Sweet
          selected={modalSweetType}
          setSelected={(value) => setModalSweetType(value)}
          types={itemDetails.types}
          windowWidth={windowWidth}
        />
      );
    }

    if (itemType === 'kebab') {
      return (
        <Kebab
          meal={modalSelectedMealDetails}
          setMeal={(value) => handleMealSelection(value)}
          windowWidth={windowWidth}
          sides={itemDetails.sides}
          meals={itemDetails.mealDetails || []}
          optionals={modalOptionals}
          setOptionals={(key, value) => {
            setModalOptionals((prev) => ({ ...prev, [key]: value }))
          }}
        />
      );
    }

    if (itemType === 'hamburger') {
      return (
        <Hamburger
          meal={modalSelectedMealDetails}
          setMeal={(value) => handleMealSelection(value)}
          windowWidth={windowWidth}
          ingredients={itemDetails.includes}
          meals={itemDetails.mealDetails || []}
          optionals={modalOptionals}
          setOptionals={(key, value) => {
            setModalOptionals((prev) => ({ ...prev, [key]: value }))
          }}
        />
      );
    }

    if (itemType === 'pizza') {
      return (
        <Pizza
          meal={modalSelectedMealDetails}
          setMeal={(value) => handleMealSelection(value)}
          windowWidth={windowWidth}
          ingredients={itemDetails.includes}
          meals={itemDetails.mealDetails || []}
          optionals={modalOptionals}
          setOptionals={(key, value) => {
            setModalOptionals((prev) => ({ ...prev, [key]: value }))
          }}
          sizes={itemDetails.pizzaSizeDetails.sizes}
          selectedSize={modalPizzaSizeOption}
          setSelectedSize={(value) => {
            setModalPizzaSizeOption(value);
            const basePrice = (itemDetails.price) + itemDetails.pizzaSizeDetails.sizes.indexOf(value) * itemDetails.pizzaSizeDetails.sizePriceConstant;
            setBasePrice(basePrice);
          }}
        />
      );
    }

    return null;
  };

  const handleQuantityChange = (val) => {
    setModalQuantity((prev) => prev + val);
  };

  const handleClose = () => {
    clearModalSelections();
    onClose();
  };

  //Return values based on the item type before submit
  const typeFieldMap = () => {
    const fields = {
      drink: {
        drinkType: modalDrinkType,
        totalPrice: modalTotalPrice,
        quantity: modalQuantity
      },
      falafel: {
        selectedMealDetails: modalSelectedMealDetails,
        totalPrice: modalTotalPrice,
        falafelPieces: modalFalafelPieces,
        quantity: modalQuantity
      },
      hamburger: {
        optionals: modalOptionals,
        selectedMealDetails: modalSelectedMealDetails,
        totalPrice: modalTotalPrice,
        quantity: modalQuantity
      },
      kebab: {
        optionals: modalOptionals,
        selectedMealDetails: modalSelectedMealDetails,
        totalPrice: modalTotalPrice,
        quantity: modalQuantity
      },
      pizza: {
        optionals: modalOptionals,
        selectedMealDetails: modalSelectedMealDetails,
        totalPrice: modalTotalPrice,
        pizzaSizeOption: modalPizzaSizeOption,
        quantity: modalQuantity
      },
      side: {
        totalPrice: modalTotalPrice,
        sideSizeOption: modalSideSizeOption,
        quantity: modalQuantity
      },
      sweet: {
        totalPrice: modalTotalPrice,
        sweetType: modalSweetType,
        quantity: modalQuantity
      },
      sauce: {
        totalPrice: modalTotalPrice,
        quantity: modalQuantity
      }
    };
    return fields[itemType];
  };

  //Checks if inputs are valid to enable/disable submission button
  const isValid = () => {
    if (isEmpty(itemDetails)) return false;

    // Based on the item type apply the validation method
    const validate = (key) => {
      switch (key) {
        case 'drink': {
          if (isEmpty(itemDetails.types)) {
            return false;
          }

          return modalDrinkType.length > 0;
        }
        case 'falafel': {
          return modalFalafelPieces > 0;
        }
        case 'pizza': {
          return modalPizzaSizeOption.length > 0;
        }
        case 'side': {
          if (isEmpty(itemDetails.sizeDetails) || isEmpty((itemDetails.sizeDetails || {}).options)) {
            return false
          }
          return modalSideSizeOption.length > 0
        }
        case 'sweet': {
          if (isEmpty(itemDetails.types)) {
            return true;
          }
          return modalSweetType.length > 0;
        }
        default:
          return true;
      }
    };

    return validate(itemType) && modalQuantity > 0;
  };

  //Different restaurant the flag to clear cart before adding new item
  const handleAddCard = async ({ differentRestaurant = false }) => {
    //Get data

    const data = typeFieldMap();
    try {
      await addCartItem({
        variables: {
          item: {
            ...data,
            name: itemDetails.name,
            itemType,
            price: itemDetails.price
          },
          restaurantId: restaurantDetails.id,
          differentRestaurant
        }
      });
      handleClose();
    } catch (error) {
      //If there is an error and message is this open different restaurant warning dialog.
      if (error.message === 'differentRestaurantItem') {
        setAlertDialogOpen(true);
      } else {
        console.log(error);
      }
    }
  };

  const handleUpdate = async () => {
    const data = { ...typeFieldMap(), itemType, name: itemDetails.name, price: itemDetails.price };

    try {
      await updateCartItem({
        variables: {
          itemId: updateId,
          details: data
        }
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
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
        <CustomAlertDialog
          dialogBody={t('hasAnotherRestaurantItem')}
          dialogHeader={t('warning')}
          confirmButtonColorScheme="teal"
          isOpen={isAlertDialogOpen}
          onClose={() => setAlertDialogOpen(false)}
          onConfirm={async () => {
            setAlertDialogOpen(false);
            handleAddCard({ differentRestaurant: true })
          }}
          onConfirmText={t('yes')}
        />
        <ModalContent>
          <ModalCloseButton onClick={handleClose} />
          <ModalHeader>{t(itemDetails.name)}</ModalHeader>
          <ModalBody>
            {getContent()}
            <Flex w="100%" justifyContent="center" alignItems="center" mt={5}>
              <IconButton
                variant="ghost"
                disabled={modalQuantity === 1}
                colorScheme="teal"
                fontSize="13px"
                onClick={() => handleQuantityChange(-1)}
                icon={<MinusIcon />}
              />
              <Text fontSize="17px" fontWeight="semibold" mx={2}>{modalQuantity}</Text>
              <IconButton
                variant="ghost"
                colorScheme="teal"
                fontSize="13px"
                onClick={() => handleQuantityChange(1)}
                icon={<AddIcon />}
              />
            </Flex>
          </ModalBody>
          <ModalFooter p={[1, 2, 3]}>
            <Flex w="30%" justifyContent="flex-start">
              <Text fontWeight="semibold" fontSize={['12px', '15px', '18px']}>{`${t('total')}: $${modalTotalPrice.toFixed(2)}`}</Text>
            </Flex>
            <Flex w="70%" justifyContent="flex-end">
              <Button
                w="100px"
                mr={5}
                colorScheme="teal"
                disabled={!isValid()}
                isLoading={false}
                onClick={() => {
                  if (updateModal) {
                    return handleUpdate();
                  }
                  return handleAddCard({ differentRestaurant: false });
                }}
                isTruncated
              >
                {updateModal ? t('update') : t('addToCard')}
              </Button>
              <Button
                colorScheme="pink"
                w="100px"
                onClick={handleClose}
              >
                {t('close')}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay >
    </Modal>
  );
};

Food.propTypes = {
  details: PropTypes.shape({
    itemDetails: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      optionals: PropTypes.array,
      includes: PropTypes.array,
      sides: PropTypes.array,
      sizeDetails: PropTypes.shape({
        options: PropTypes.array,
        sizePriceConstant: PropTypes.number
      }),
      types: PropTypes.array
    }),
    itemType: PropTypes.string
  }).isRequired,
  drinkType: PropTypes.string,
  falafelPieces: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  optionals: PropTypes.shape({}),
  pizzaSizeOption: PropTypes.string,
  restaurantDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired
  }).isRequired,
  quantity: PropTypes.number,
  selectedMealDetails: PropTypes.shape({
    mealPrice: PropTypes.number,
    totalPrice: PropTypes.number,
    size: PropTypes.string,
    name: PropTypes.string
  }),
  sideSizeOption: PropTypes.string,
  sweetType: PropTypes.string,
  updateId: PropTypes.string,
  updateModal: PropTypes.bool
};

export default Food;
