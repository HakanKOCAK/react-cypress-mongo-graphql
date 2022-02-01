import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { userCartQuery } from '../../graphql/queries';
import {
  Button,
  Center,
  Heading
} from '@chakra-ui/react';
import Address from './Address';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteDialog from '../Modals/CustomAlertDialog';
import NewAddressDialog from '../Modals/NewAddress';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { deleteAddressMutation, emptyCartMutation } from '../../graphql/mutations';

const Addresses = ({
  isCheckout,
  addresses,
  setSelectedAddress,
  selectedAddress,
  addressContainerCursor,
  actionDisabled,
  width
}) => {
  const { t } = useTranslation();

  //Clear user cart mutation - refetch after its finished cart details..
  const [emptyCart] = useMutation(emptyCartMutation, {
    refetchQueries: [userCartQuery]
  });

  const [isNewAddressDialogOpen, setNewAddressDialogOpen] = useState(false);
  //Delete dialog opts
  const [deleteDialogBody, setDeleteDialogBody] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogItemId, setDeleteDialogItemId] = useState('');

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

  const getBody = () => {
    if (isEmpty(addresses)) {
      return (
        <Heading size="md" textAlign="center">
          {t('youDontHaveAnyAddress')}
        </Heading>
      );
    }

    return addresses.map((item, index) => (
      <Address
        key={item.id}
        index={index}
        onClick={async () => {
          if (isCheckout && setSelectedAddress) {
            return setSelectedAddress(item)
          } else if (setSelectedAddress) {
            //Check clicked item is not already selected
            if (item.id !== selectedAddress) {
              //Clear user cart on address change
              await emptyCart();
              localStorage.setItem('fooder.last.address', JSON.stringify(item));
              return setSelectedAddress(item)
            }
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
        {...(!actionDisabled ? {
          actionIcon: <DeleteIcon />,
          actionIconOnClick: () => {
            //Opens the delete dialog
            setDeleteDialogItemId(item.id);
            setDeleteDialogBody(`${t('areYouSureWantToDelete')}: ${item.address}?`);
            setDeleteDialogOpen(true);
          }
        } : {})}
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
        width={width}
      />
      {/*Render new address dialog*/}
      <NewAddressDialog
        isOpen={isNewAddressDialogOpen}
        onClose={() => setNewAddressDialogOpen(false)}
        width={width}
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
  actionDisabled: PropTypes.bool,
  addresses: PropTypes.array.isRequired,
  isCheckout: PropTypes.bool,
  addressContainerCursor: PropTypes.string,
  setSelectedAddress: PropTypes.func,
  selectedAddress: PropTypes.string,
  width: PropTypes.number.isRequired
}

export default Addresses
