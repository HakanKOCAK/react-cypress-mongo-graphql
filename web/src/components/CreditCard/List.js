import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Center,
  Heading,
  Spinner
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteDialog from '../Modals/CustomAlertDialog';
import CreditCardModal from '../Modals/CreditCardModal';
import CreditCard from './CreditCard';
import { myCreditCards } from '../../graphql/queries';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { deleteCreditCardMutation } from '../../graphql/mutations';

const CreditCards = () => {
  const { t } = useTranslation();

  const [isCreditCardModalOpen, setCreditCardModalOpen] = useState(false);

  //Delete dialog opts
  const [deleteDialogBody, setDeleteDialogBody] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogItemId, setDeleteDialogItemId] = useState('');

  //Fetch credit cards
  const { data, loading } = useQuery(myCreditCards);

  //Delete credit card mutation -- update cache if successfull
  const [deleteCreditCard] = useMutation(deleteCreditCardMutation, {
    update: (store, { data }) => {
      if (!data) {
        return;
      }
      if (data && data.deleteCreditCard) {
        store.modify({
          fields: {
            myCreditCards(existing = [], { readField }) {
              return existing.filter(cardRef => data.deleteCreditCard !== readField('id', cardRef))
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
    if (isEmpty(data) || isEmpty(data.myCreditCards)) {
      return (
        <Heading size="md" textAlign="center">
          {t('youDontHaveAnyCards')}
        </Heading>
      );
    }

    return data.myCreditCards.map((item) => (
      <CreditCard
        actionIcon={<DeleteIcon />}
        actionIconOnClick={() => {
          //Opens the delete dialog
          setDeleteDialogItemId(item.id);
          setDeleteDialogBody(`${t('areYouSureWantToDelete')}: ${item.description}?`);
          setDeleteDialogOpen(true);
        }}
        key={item.id}
        details={item}
      />
    ));
  }


  return (
    <>
      <DeleteDialog
        confirmButtonColorScheme="red"
        isOpen={isDeleteDialogOpen}
        dialogBody={deleteDialogBody}
        dialogHeader={t('deleteCreditCard')}
        onClose={() => {
          //To do on close clicked on alert dialog
          setDeleteDialogItemId('');
          return setDeleteDialogOpen(false);
        }}
        onConfirm={async () => {
          try {
            await deleteCreditCard({ variables: { id: deleteDialogItemId } })

          } catch (error) {
            //This is the to display error on alert dialog... Not much detailed though.
            throw error;
          }
        }}
        onConfirmText={t('delete')}
      />
      <CreditCardModal isOpen={isCreditCardModalOpen} onClose={() => setCreditCardModalOpen(false)} />
      <Center>
        <Button
          variant="link"
          mb={5}
          colorScheme="teal"
          onClick={() => setCreditCardModalOpen(true)}
        >
          {t('addACreditCard')}
        </Button>
      </Center>
      {getBody()}
    </>
  )

}

export default CreditCards
