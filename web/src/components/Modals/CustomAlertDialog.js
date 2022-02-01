import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import getModalSize from '../../utils/modalSize';

const CustomAlertDialog = ({
  confirmButtonColorScheme,
  dialogHeader,
  dialogBody,
  onConfirmText,
  isSubmitting,
  isOpen,
  onClose,
  onConfirm,
  width: windowWidth
}) => {
  const { t } = useTranslation();

  //Set action button to loading if there is an async method.
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isSubmitting);
  }, [isSubmitting]);

  //To focus to cancel when first opened to make sure something crucial doesnt happen unwillingly
  const cancelRef = useRef(null);

  //Sets error message
  const [actionErrors, setActionErrors] = useState('');

  const onDialogClose = () => {
    setActionErrors('');
    return onClose();
  }

  return (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      size={getModalSize(windowWidth)}
      leastDestructiveRef={cancelRef}
      onClose={onDialogClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontWeight="bold">
            {dialogHeader}
          </AlertDialogHeader>

          <AlertDialogBody>
            {dialogBody}
            {actionErrors && (
              <Text mt={3} color="red.400">{actionErrors}</Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDialogClose} mr={3} data-cy="dialog-close-btn">
              {t('cancel')}
            </Button>

            {
              onConfirmText && onConfirm && (
                <Button
                  isLoading={isLoading}
                  colorScheme={confirmButtonColorScheme}
                  onClick={async () => {
                    setIsLoading(true)
                    try {
                      await onConfirm();
                      onDialogClose();
                    } catch (error) {
                      console.log(error);
                      //Could be more detailed error handling...
                      setActionErrors(t('serverError'))
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  data-cy="dialog-confirm-btn"
                >
                  {onConfirmText}
                </Button>
              )
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
};

CustomAlertDialog.propTypes = {
  confirmButtonColorScheme: PropTypes.string.isRequired,
  dialogHeader: PropTypes.string.isRequired,
  dialogBody: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  onConfirmText: PropTypes.string,
  width: PropTypes.number.isRequired
}

export default CustomAlertDialog
