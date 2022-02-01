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
import CreditCardList from '../../CreditCard/List';
import getModalSize from '../../../utils/modalSize';

//Address List
const CreditCardListModal = ({
  isOpen,
  cursor,
  selectedId,
  setSelected,
  onClose,
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
          <ModalCloseButton />
          <ModalHeader>{t('myCards')}</ModalHeader>
          <ModalBody>
            <CreditCardList
              cursor={cursor}
              selectedId={selectedId}
              setSelected={(item) => {
                setSelected(item);
                return onClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
};

CreditCardListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedId: PropTypes.string,
  setSelected: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

export default CreditCardListModal
