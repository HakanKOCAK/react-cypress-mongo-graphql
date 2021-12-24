import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  VStack
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';

const RestaurantFilter = ({
  defaultFilters,
  isOpen,
  onClose,
  setFilters
}) => {

  //Comes from props. check /pages/Restaurant.js
  const { cuisineFilters, maxArrival, minAmount } = defaultFilters;

  //Tooltips of sliders
  const [showMinAmountTooltip, setShowMinAmountTooltip] = useState(false);
  const [showMaxDeliveryTooltip, setShowMaxDeliveryTooltip] = useState(false);

  //Filter options of modal. set default options when first rendered
  const [modalCuisineFilters, setModalCuisineFilters] = useState(cuisineFilters);
  const [modalMaxArrival, setModalMaxArrival] = useState(maxArrival);
  const [modalMinAmount, setModalMinAmount] = useState(minAmount);

  const { t } = useTranslation();

  const handleClose = () => {
    //Filter options of modal. set default options when closed
    onClose();
    setModalCuisineFilters(cuisineFilters);
    setModalMaxArrival(maxArrival);
    setModalMinAmount(minAmount);
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
          <ModalCloseButton onClick={handleClose} />

          <ModalHeader>{t('filter')}</ModalHeader>

          <ModalBody>
            <VStack alignItems="flex-start">
              <Text fontWeight="semibold">{t('cuisines')}</Text>
              <VStack alignItems="flex-start">
                <Checkbox
                  onChange={(e) => setModalCuisineFilters((prev) => ({ ...prev, Falafel: e.target.checked }))}
                  isChecked={modalCuisineFilters.Falafel}
                >
                  Falafel
                </Checkbox>
                <Checkbox
                  onChange={(e) => setModalCuisineFilters((prev) => ({ ...prev, Hamburger: e.target.checked }))}
                  isChecked={modalCuisineFilters.Hamburger}
                >
                  Hamburger
                </Checkbox>
                <Checkbox
                  onChange={(e) => setModalCuisineFilters((prev) => ({ ...prev, Kebab: e.target.checked }))}
                  isChecked={modalCuisineFilters.Kebab}
                >
                  Kebab
                </Checkbox>
                <Checkbox
                  onChange={(e) => setModalCuisineFilters((prev) => ({ ...prev, Pizza: e.target.checked }))}
                  isChecked={modalCuisineFilters.Pizza}
                >
                  Pizza
                </Checkbox>
              </VStack>
            </VStack>

            <VStack spacing={1} alignItems="flex-start" mt={6}>
              <Text fontWeight="semibold">{t('minAmount')}</Text>
              <Slider
                defaultValue={modalMinAmount}
                min={0}
                max={30}
                onMouseEnter={() => setShowMinAmountTooltip(true)}
                onMouseLeave={() => setShowMinAmountTooltip(false)}
                mb={6}
                mt={6}
                onChange={(v) => setModalMinAmount(v)}
              >
                <SliderMark
                  value={0}
                  mt={3}
                  ml={-2.5}
                >
                  0
                </SliderMark>
                <SliderMark
                  value={15}
                  mt={3}
                  ml={-2.5}
                >
                  15
                </SliderMark>
                <SliderMark
                  value={30}
                  mt={3}
                  ml={-2.5}
                >
                  30
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="teal.400" />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="teal.400"
                  color="white"
                  placement="top"
                  isOpen={showMinAmountTooltip}
                  label={modalMinAmount}
                >
                  <SliderThumb boxSize={6} bg="pink.400" />
                </Tooltip>
              </Slider>
            </VStack>

            <VStack spacing={1} alignItems="flex-start" mt={8} mb={10}>
              <Text fontWeight="semibold">{t('maxArrival')}</Text>
              <Slider
                defaultValue={modalMaxArrival}
                min={10}
                max={60}
                onMouseEnter={() => setShowMaxDeliveryTooltip(true)}
                onMouseLeave={() => setShowMaxDeliveryTooltip(false)}
                mb={6}
                mt={6}
                onChange={(v) => setModalMaxArrival(v)}
              >
                <SliderMark
                  value={10}
                  mt={3}
                  ml={-2.5}
                >
                  10min
                </SliderMark>
                <SliderMark
                  value={30}
                  mt={3}
                  ml={-2.5}
                >
                  30min
                </SliderMark>
                <SliderMark
                  value={45}
                  mt={3}
                  ml={-2.5}
                >
                  45min
                </SliderMark>
                <SliderMark
                  value={60}
                  mt={3}
                  ml={-2.5}
                >
                  60min
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="teal.400" />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="teal.400"
                  color="white"
                  placement="top"
                  isOpen={showMaxDeliveryTooltip}
                  label={modalMaxArrival}
                >
                  <SliderThumb boxSize={6} bg="pink.400" />
                </Tooltip>
              </Slider>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={5}
              w="80px"
              colorScheme="teal"
              onClick={() => {
                const filters = [];
                //Check if a cuisine selected and add to filters
                if (!isEqual(cuisineFilters, modalCuisineFilters)) {
                  filters.push({ filterBy: 'cuisine', filterValue: modalCuisineFilters });
                }

                //Check if  min amount is updated and add to filters
                if (!isEqual(minAmount, modalMinAmount)) {
                  filters.push({ filterBy: 'minAmount', filterValue: modalMinAmount });
                }

                //Check if max arrival is updated and add to filters
                if (!isEqual(maxArrival, modalMaxArrival)) {
                  filters.push({ filterBy: 'maxArrival', filterValue: modalMaxArrival });
                }

                //Set filters (comes from props).
                setFilters(filters);
                handleClose();
              }}
            >{t('filter')}</Button>
            <Button
              w="80px"
              colorScheme="pink"
              onClick={handleClose}
            >{t('close')}</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal >
  )
}

RestaurantFilter.propTypes = {
  defaultFilters: PropTypes.shape({
    cuisineFilters: PropTypes.shape({
      Falafel: PropTypes.bool.isRequired,
      Hamburger: PropTypes.bool.isRequired,
      Kebab: PropTypes.bool.isRequired,
      Pizza: PropTypes.bool.isRequired
    }).isRequired,
    maxArrival: PropTypes.number.isRequired,
    minAmount: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default RestaurantFilter
