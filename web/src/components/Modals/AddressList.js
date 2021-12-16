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

//Address List
const AddressModal = ({
  isOpen,
  onClose,
  setSelectedAddress,
  selectedId
}) => {
  const { t } = useTranslation();
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
          <ModalCloseButton data-cy="address-list-close-btn" />
          <ModalHeader>{t('myAddresses')}</ModalHeader>
          <ModalBody>
            <AddresList
              addressContainerCursor="pointer"
              setSelectedAddress={setSelectedAddress}
              selectedAddress={selectedId}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
};

AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setSelectedAddress: PropTypes.func.isRequired,
  selectedId: PropTypes.string
};

export default AddressModal
