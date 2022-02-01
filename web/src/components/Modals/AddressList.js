import React from 'react'
import PropTypes from 'prop-types'
import {
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AddresList from '../Address/List';
import getModalSize from '../../utils/modalSize';

//Address List
const AddressModal = ({
  isOpen,
  actionDisabled,
  addresses,
  isCheckout,
  onClose,
  setSelectedAddress,
  selectedId,
  width: windowWidth
}) => {
  const { t } = useTranslation();
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
          <ModalCloseButton data-cy="address-list-close-btn" />
          <ModalHeader>{t('myAddresses')}</ModalHeader>
          <ModalBody>
            <AddresList
              actionDisabled={actionDisabled}
              addresses={addresses}
              isCheckout={isCheckout}
              addressContainerCursor="pointer"
              setSelectedAddress={setSelectedAddress}
              selectedAddress={selectedId}
              width={windowWidth}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
};

AddressModal.propTypes = {
  actionDisabled: PropTypes.bool,
  addresses: PropTypes.array.isRequired,
  isCheckout: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setSelectedAddress: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
  width: PropTypes.number.isRequired
};

export default AddressModal
