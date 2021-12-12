import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import CustomAlertDialog from './CustomAlertDialog';
import { isEmpty } from 'lodash';
import Address from '../Address';
import { useTranslation } from 'react-i18next';
import NewAddress from './NewAddress';
import { useMutation } from '@apollo/client';
import { deleteAddressMutation } from '../../graphql/mutations';

//Address List
const AddressModal = ({
  isOpen,
  onClose,
  addresses,
  setSelectedAddress,
  selectedId
}) => {
  const { t } = useTranslation();

  //To display new address dialog on add button clicked
  const [isNewAddressDialogOpen, setNewAddressDialogOpen] = useState(false);

  //To display delete dialog on delete button clicked
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  //Since the dialog can be used any other place, I am setting the body dynamically while opening
  const [deleteDialogBody, setDeleteDialogBody] = useState('');

  //This is to keep track of the id of the address to be deleted. 
  //(There are many addresses and each of them has unique delete button)
  const [deleteDialogAddressId, setDeleteDialogAddressId] = useState('');

  //Delete mutation -- update cache if successfull
  const [deleteAddress] = useMutation(deleteAddressMutation, {
    update: (store, { data }) => {
      if (!data) {
        return;
      }
      if (data && data.deleteAddress) {
        store.modify({
          fields: {
            myAddresses(existing = [], { readField }) {
              return existing.filter(addressRef => data.deleteAddress !== readField('id', addressRef))
            }
          }
        })
      }
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalOverlay>
        {/* Renders alert dialog */}
        <CustomAlertDialog
          confirmButtonColorScheme="red"
          isOpen={isDeleteDialogOpen}
          dialogBody={deleteDialogBody}
          dialogHeader={t('deleteAddress')}
          onClose={() => {
            //To do on close clicked on alert dialog
            setDeleteDialogAddressId('');
            return setDeleteDialogOpen(false);
          }}
          onConfirm={async () => {
            try {
              //Check if error exists
              await deleteAddress({ variables: { id: deleteDialogAddressId } });

              //Set selected address to empty object if user is deleted the selected address
              if (selectedId === deleteDialogAddressId) {
                localStorage.removeItem('fooder.last.address')
                setSelectedAddress({});
              }
            } catch (error) {
              //This is the to display error on alert dialog... Not much detailed though.
              throw error;
            }
          }}
          onConfirmText={t('delete')}
        />
        {/*Render new address dialog*/}
        <NewAddress
          isOpen={isNewAddressDialogOpen}
          onClose={() => setNewAddressDialogOpen(false)}
        />
        <ModalContent>
          <ModalCloseButton data-cy="address-list-close-btn" />

          <ModalHeader>{t('myAddresses')}</ModalHeader>

          <ModalBody>
            <Button
              variant="link"
              mb={5}
              colorScheme="teal"
              onClick={() => setNewAddressDialogOpen(true)}
              data-cy="add-address-btn"
            >
              {t('addAnAddress')}
            </Button>

            {/* Check if user do not have an address */}
            {isEmpty(addresses) ? (
              <Box textAlign="center">
                <Heading size="md">{t('youDontHaveAnyAddress')}</Heading>
              </Box>
            ) : (
              //Map the user addresses and display address component 
              addresses.map((item) => (
                <Address
                  key={item.id}
                  onClick={() => {
                    localStorage.setItem('fooder.last.address', item.id);
                    return setSelectedAddress(item)
                  }}
                  containerStyle={{
                    w: '100%',
                    mb: 5,
                    bg: selectedId === item.id ? 'teal.400' : 'gray.100' //sets background if address is selected
                  }}
                  icon={`${item.title}.png`}
                  details={item}
                  actionIcon={<DeleteIcon />}
                  actionIconOnClick={() => {
                    //Opens the delete dialog
                    setDeleteDialogAddressId(item.id);
                    setDeleteDialogBody(`${t('areYouSureWantToDelete')}: ${item.address}?`);
                    setDeleteDialogOpen(true);
                  }}
                />
              ))
            )}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
};

AddressModal.propTypes = {
  addresses: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setSelectedAddress: PropTypes.func.isRequired,
  selectedId: PropTypes.string
};

export default AddressModal
