import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Center,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Text,
  VStack
} from '@chakra-ui/react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import { addCreditCardMutation } from '../../graphql/mutations';
import getModalSize from '../../utils/modalSize';

//Expiry pattern (min: 01/21, max: 12/99)
const expiryPattern = /^(0[1-9]|1[0-2])\/([2-9][1-9])$/;

const CreditCardModal = ({ isOpen, onClose, width: windowWidth }) => {
  const { t } = useTranslation();

  const errorRef = useRef(null);

  //Card details
  const [cardNumber, setCardNumber] = useState('');
  const [description, setDescription] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cardNumberLenght, setCardNumberLength] = useState(16);
  const [cardHolder, setCardHolder] = useState('');
  const [cvc, setCvc] = useState('');
  const [issuer, setIssuer] = useState('');

  //To send Cards component
  const [focusedInput, setFocusedInput] = useState('number');

  //To handle errors --- validation of input fields
  const [inputFocusList, setInputFocusList] = useState({
    cardNumber: false,
    expiry: false,
    description: false,
    cardHolder: false,
    cvc: false
  });

  //Add card mutation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  // Updates store if successful
  const [addCard] = useMutation(addCreditCardMutation, {
    update: (store, { data }) => {
      if (!data) {
        return
      }
      if (data && data.addCreditCard) {
        store.modify({
          fields: {
            myCreditCards(existing = []) {
              const newCard = store.writeFragment({
                data: data.addCreditCard,
                fragment: gql`
                fragment Card on MyCreditCards {
                  id
                  description
                  issuer
                  number
                  type
                }
                `
              });

              console.log('1', newCard)
              console.log('2', store)
              return [...existing, newCard];
            }
          }
        })
      }
    }
  })

  useEffect(() => {
    if (errors.addCard) {
      errorRef.current.scrollIntoView();
    }
  }, [errors])

  const handleClose = () => {

    //Clear focus list => error handling
    setInputFocusList({
      cardNumber: false,
      expiry: false,
      cardHolder: false,
      cvc: false
    });

    //Set focus to number for next modal opening
    setFocusedInput('number')

    //Clear data
    setCardNumber('');
    setExpiry('');
    setCardHolder('');
    setCvc('');
    setDescription('');
    setCardNumberLength(16);
    setErrors({});

    //Return onclose -- props
    return onClose();
  }

  const cardCallBack = ({ issuer, maxLength }) => {
    //Set issuer dynamically --- data comes from cards component which fetches from 'payment'
    setIssuer(issuer);
    return setCardNumberLength(maxLength);
  }

  const isCardValid = ({ field = null }) => {

    const validateCardNumber = (len) => {
      if (issuer === 'visa' || issuer === 'mastercard') {
        return len === cardNumberLenght || len === cardNumberLenght - 3;
      }

      return len === cardNumberLenght;
    }
    //Validate each field
    const validate = {
      cardNumber: validateCardNumber(cardNumber.length),
      cardHolder: cardHolder.length > 0,
      expiry: expiryPattern.test(expiry),
      description: description.length > 0,
      cvc: cvc.length === (issuer === 'amex' ? 4 : 3)
    }

    //Check if a field specified as arg and return requested field check
    if (field) {
      return validate[field];
    }

    return (
      validate.cardNumber &&
      validate.cardHolder &&
      validate.cvc &&
      validate.expiry &&
      validate.description
    )
  }

  const handleExpiryChange = (expiry) => {

    // Make sure only number entered. not ['.', ',', 'e', ....]
    const clear = (val) => val.replace(/\D+/g, '')

    let cleared = clear(expiry);
    if (cleared.length >= 3) {
      cleared = `${cleared.slice(0, 2)}/${cleared.slice(2, 4)}`;
    } else {
      cleared = cleared.replace('/', '');
    }

    const validate = (val) => {
      //To validate entered input
      const afterMonth = /^(0[1-9]|1[0-2])\/[2-9]$/; //make sures year starts w 2 or 9 (min:01/2, max:12/9)
      const fullMonth = /^(0[1-9]|1[0-2])$/; //make sures month is min:01, max: 12
      const partialMonth = /^[0-1]$/ //make sures month starts w 0 or 1.

      if (!val) return true;

      return (
        expiryPattern.test(val) ||
        afterMonth.test(val) ||
        partialMonth.test(val) ||
        fullMonth.test(val)
      )
    }

    if (validate(cleared)) {
      setExpiry(cleared)
    }
  };

  const handleChange = (event) => {
    const target = event.target.name;
    const value = event.target.value;

    switch (target) {
      case 'cardNumber':
        if (value.length <= cardNumberLenght) {
          setCardNumber(value);
        }
        break;
      case 'cardHolder':
        setCardHolder(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'cvc':
        setCvc(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addCard({
        variables: {
          cardNumber,
          cardHolder,
          cvc,
          expiry,
          description,
          issuer
        },
      });

      handleClose();
    } catch (error) {
      console.log(error);
      if (error.message) {
        setErrors({ addCard: t('serverError') });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={getModalSize(windowWidth)}
      scrollBehavior="inside"
    >
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton onClick={handleClose} />
          <ModalHeader>{t('newCard')}</ModalHeader>
          <ModalBody>
            <Center>
              <Cards
                cvc={cvc}
                expiry={expiry}
                number={cardNumber}
                focused={focusedInput}
                acceptedCards={['visa', 'mastercard', 'maestro', 'amex']}
                name={cardHolder}
                placeholders={{ name: t('cardHolder') }}
                locale={{ valid: t('expiry') }}
                callback={cardCallBack}
              />
            </Center>

            <VStack w="100%" alignItems="flex-start" mt={2}>
              <FormLabel mb={0} fontSize="13px">{`${t('description')}*`}</FormLabel>
              <Input
                name="description"
                placeholder={t('description')}
                isInvalid={inputFocusList.description && !isCardValid({ field: 'description' })}
                value={description}
                onChange={handleChange}
                type="text"
                data-cy="description-input"
                onFocus={() => {
                  return setInputFocusList((prev) => ({ ...prev, description: true }))
                }}
              />
            </VStack>

            <VStack w="100%" alignItems="flex-start" mt={2}>
              <FormLabel mb={0} fontSize="13px">{`${t('cardNumber')}*`}</FormLabel>
              <Input
                name="cardNumber"
                placeholder={t('cardNumber')}
                isInvalid={inputFocusList.cardNumber && !isCardValid({ field: 'cardNumber' })}
                value={cardNumber}
                onChange={handleChange}
                data-cy="number-input"
                type="number"
                onFocus={() => {
                  setFocusedInput('number');
                  return setInputFocusList((prev) => ({ ...prev, cardNumber: true }))
                }}
              />
            </VStack>

            <VStack w="100%" alignItems="flex-start" mt={5}>
              <FormLabel mb={0} fontSize="13px">{`${t('cardHolder')}*`}</FormLabel>

              <Input
                name="cardHolder"
                isInvalid={inputFocusList.cardHolder && !isCardValid({ field: 'cardHolder' })}
                placeholder={t('cardHolder')}
                value={cardHolder}
                onChange={handleChange}
                data-cy="holder-input"
                type="text"
                onFocus={() => {
                  setFocusedInput('name');
                  return setInputFocusList((prev) => ({ ...prev, cardHolder: true }))
                }}
              />
            </VStack>

            <HStack w="100%" spacing={2} alignItems="flex-start" mt={5}>
              <VStack w="100%" alignItems="flex-start">
                <FormLabel
                  mb={0
                  } fontSize="13px"
                >{`${t('expiry')}*`} <span style={{ fontSize: '10px' }}> 01/21 - 12/99</span>
                </FormLabel>

                <NumberInput
                  w="100%"
                  isInvalid={inputFocusList.expiry && !isCardValid({ field: 'expiry' })}
                  value={expiry}
                  data-cy="expiry-input"
                  onChange={(value) => handleExpiryChange(value)}>
                  <NumberInputField
                    placeholder={t('expiry')}
                    onFocus={() => {
                      setFocusedInput('expiry');
                      return setInputFocusList((prev) => ({ ...prev, expiry: true }))
                    }}
                  />
                </NumberInput>
              </VStack>

              <VStack w="100%" alignItems="flex-start">
                <FormLabel mb={0} fontSize="13px">CVC*</FormLabel>

                <Input
                  w="100%"
                  name="cvc"
                  isInvalid={inputFocusList.cvc && !isCardValid({ field: 'cvc' })}
                  placeholder="CVC"
                  value={cvc}
                  data-cy="cvc-input"
                  maxLength={issuer === 'amex' ? 4 : 3}
                  onChange={handleChange}
                  type="text"
                  onFocus={() => {
                    setFocusedInput('cvc');
                    return setInputFocusList((prev) => ({ ...prev, cvc: true }))
                  }}
                />
              </VStack>
            </HStack>

            <Text
              mt={5}
              color="red.500"
              fontSize="md"
              ref={errorRef}>
              {errors.addCard}
            </Text>

          </ModalBody>
          <ModalFooter>
            <Button
              disabled={!isCardValid({ field: null })}
              mr={5}
              w="85px"
              colorScheme="teal"
              data-cy="save-card-btn"
              isLoading={isSubmitting}
              onClick={handleSubmit}
            >
              {t('save')}
            </Button>

            <Button
              colorScheme="pink"
              w="85px"
              data-cy="new-card-cancel-btn"
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay >
    </Modal >
  )
}

CreditCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
}

export default CreditCardModal
