import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  ModalBody,
  ModalHeader,
  HStack,
  FormErrorMessage,
  ModalFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import SelectField from '../SelectField';
import InputField from '../InputField';
import { useTranslation } from 'react-i18next';
import {
  useQuery,
  useLazyQuery,
  useMutation,
  gql
} from '@apollo/client'
import {
  getCities,
  getCounties,
  getDistricts
} from '../../graphql/queries';
import { addAddressMutation } from '../../graphql/mutations';
import getModalSize from '../../utils/modalSize';

const NewAddress = ({ isOpen, onClose, width: windowWidth }) => {
  const { t } = useTranslation();
  //Check if submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  //To fetch counties/districts from server
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');

  //Query cities on render
  const { data: cityData, loading: citiesLoading } = useQuery(getCities);

  //To lazy query counties when city selected
  const [fetchCounty, { data: countyData, loading: countiesLoading }] = useLazyQuery(getCounties);

  //To lazy query district when county selected
  const [fetchDistrict, { data: districtData, loading: districtsLoading }] = useLazyQuery(getDistricts);

  //Add address mutation and update to cache if successfull
  const [addAddress] = useMutation(addAddressMutation, {
    update: (store, { data }) => {
      if (!data) {
        return
      }
      if (data && data.addAddress) {
        store.modify({
          fields: {
            myAddresses(existing = []) {
              const newAddress = store.writeFragment({
                data: data.addAddress,
                fragment: gql`
                  fragment Address on MyAddresses {
                    id
                    address
                    city
                    county
                    district
                    flat
                    floor
                    title
                    type
                  }
                `
              });
              return [...existing, newAddress];
            }
          }
        })
      }
    }
  });

  useEffect(() => {
    //Fetch counties of selected city on change
    setSelectedCounty('');
    if (selectedCity) {
      fetchCounty({
        variables: {
          city: selectedCity
        }
      });
    }
  }, [selectedCity, fetchCounty]);

  useEffect(() => {
    //Fetch districts of selected city/county
    if (selectedCity && selectedCounty) {
      fetchDistrict({
        variables: {
          city: selectedCity,
          county: selectedCounty
        }
      });
    }
  }, [selectedCity, selectedCounty, fetchDistrict]);

  const handleSubmit = async (values, { setErrors }) => {
    setIsSubmitting(true);
    try {
      await addAddress({
        variables: {
          ...values
        },
      });

      onClose();
    } catch (error) {
      //Just a basic error handling could be improved based on possible server responses...
      console.error(error);
      if (error.message) {
        setErrors({ addAddress: t('serverError') });
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
          <ModalCloseButton data-cy="new-address-close-btn" />

          <ModalHeader>{t('newAddress')}</ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                address: '',
                city: '',
                county: '',
                district: '',
                flat: '',
                floor: '',
                title: '',
              }}
              validate={(values) => {
                const errors = {};

                //Sets each field as required
                Object.entries(values).forEach(([key, val], index) => {
                  if (!val) {
                    errors[key] = t('required')
                  }
                })

                return errors;
              }}
              onSubmit={handleSubmit}
            >
              {({ values, errors, handleChange }) => (
                <Form id="newAddress">
                  <SelectField
                    name="title"
                    label={`${t('title')}*`}
                    placeholder={t('title')}
                    data-cy="title-select"
                    options={[t('home'), t('other'), t('work')].sort()}
                  />

                  <SelectField
                    name="city"
                    placeholder={citiesLoading ? t('loading') : t('city')}
                    disabled={citiesLoading}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSelectedCity((prev) => {
                        if (value !== prev) {
                          values.county = '';
                          values.district = '';
                          return value;
                        }
                      });
                      return handleChange(event);
                    }}
                    label={`${t('city')}*`}
                    options={(cityData && cityData.cities) || []}
                    data-cy="city-select"
                  />

                  <SelectField
                    name="county"
                    placeholder={countiesLoading ? t('loading') : t('county')}
                    disabled={countiesLoading || !values.city}
                    label={`${t('county')}*`}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSelectedCounty((prev) => {
                        if (value !== prev) {
                          values.district = '';
                          return value;
                        }
                      });
                      return handleChange(event);
                    }}
                    options={(countyData && countyData.counties) || []}
                    data-cy="county-select"
                  />

                  <SelectField
                    name="district"
                    placeholder={districtsLoading ? t('loading') : t('district')}
                    disabled={districtsLoading || !values.city || !values.county}
                    label={`${t('district')}*`}
                    options={(districtData && districtData.districts) || []}
                    data-cy="district-select"
                  />

                  <InputField
                    name="address"
                    placeholder={t('address')}
                    textArea
                    label={`${t('address')}*`}
                    data-cy="address-input"
                  />

                  <HStack spacing={5}>
                    <InputField
                      name="floor"
                      placeholder={t('floor')}
                      type="number"
                      label={`${t('floor')}*`}
                      data-cy="floor-input"
                    />

                    <InputField
                      name="flat"
                      placeholder={t('flat')}
                      type="number"
                      label={`${t('flat')}*`}
                      data-cy="flat-input"
                    />
                  </HStack>
                  {errors.addAddress && (
                    <FormErrorMessage size="sm">{t(errors.addAddress)}</FormErrorMessage>
                  )}
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form='newAddress'
              isLoading={isSubmitting}
              mr={5}
              colorScheme="teal"
              data-cy="new-address-save-btn"
            >
              {t('save')}
            </Button>
            <Button colorScheme="pink" onClick={() => onClose()}>{t('close')}</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
};

NewAddress.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

export default NewAddress
