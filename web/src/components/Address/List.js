import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { myAddresses } from '../../graphql/queries';
import {
  Button,
  Center,
  Heading,
  Spinner
} from '@chakra-ui/react';
import Address from './Address';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteDialog from '../Modals/CustomAlertDialog';
import NewAddressDialog from '../Modals/NewAddress';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { deleteAddressMutation } from '../../graphql/mutations';

const Addresses = ({
  setSelectedAddress,
  selectedAddress,
  addressContainerCursor
}) => {
  const { t } = useTranslation();

  const [isNewAddressDialogOpen, setNewAddressDialogOpen] = useState(false);
  //Delete dialog opts
  const [deleteDialogBody, setDeleteDialogBody] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogItemId, setDeleteDialogItemId] = useState('');


  //Fetch addresses
  const { data, loading } = useQuery(myAddresses);

  //Delete address mutation -- update cache if successfull
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


  if (loading) {
    return (
      <Center h="60%">
        <Spinner color="pink.500" size="lg" />
      </Center>
    );
  }

  const getBody = () => {
    if (isEmpty(data) || isEmpty(data.myAddresses)) {
      return (
        <Heading size="md" textAlign="center">
          {t('youDontHaveAnyAddress')}
        </Heading>
      );
    }

    return data.myAddresses.map((item) => (
      <Address
        key={item.id}
        onClick={() => {
          if (setSelectedAddress) {
            localStorage.setItem('fooder.last.address', JSON.stringify(item));
            return setSelectedAddress(item)
          }

          return;
        }}
        containerStyle={{
          w: '100%',
          mb: 5,
          boxShadow: 'none',
          rounded: 'none',
          bg: selectedAddress === item.id ? 'teal.400' : 'gray.100'
        }}
        cursor={addressContainerCursor && 'pointer'}
        icon={`/${item.title}.png`}
        details={item}
        actionIcon={<DeleteIcon />}
        actionIconOnClick={() => {
          //Opens the delete dialog
          setDeleteDialogItemId(item.id);
          setDeleteDialogBody(`${t('areYouSureWantToDelete')}: ${item.address}?`);
          setDeleteDialogOpen(true);
        }}
      />
    ));
  }
  return (
    <>
      <DeleteDialog
        confirmButtonColorScheme="red"
        isOpen={isDeleteDialogOpen}
        dialogBody={deleteDialogBody}
        dialogHeader={t('deleteAddress')}
        onClose={() => {
          //To do on close clicked on alert dialog
          setDeleteDialogItemId('');
          return setDeleteDialogOpen(false);
        }}
        onConfirm={async () => {
          try {
            await deleteAddress({ variables: { id: deleteDialogItemId } })

          } catch (error) {
            //This is the to display error on alert dialog... Not much detailed though.
            throw error;
          }
        }}
        onConfirmText={t('delete')}
      />
      {/*Render new address dialog*/}
      <NewAddressDialog
        isOpen={isNewAddressDialogOpen}
        onClose={() => setNewAddressDialogOpen(false)}
      />
      <Center>
        <Button
          variant="link"
          mb={5}
          colorScheme="teal"
          onClick={() => setNewAddressDialogOpen(true)}
        >
          {t('addAnAddress')}
        </Button>
      </Center>
      {getBody()}
    </>
  );
}

Addresses.propTypes = {
  addressContainerCursor: PropTypes.string,
  setSelectedAddress: PropTypes.func,
  selectedAddress: PropTypes.string
}

export default Addresses
