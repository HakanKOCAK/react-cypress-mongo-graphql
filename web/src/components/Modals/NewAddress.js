import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  ModalBody,
  ModalHeader,
  HStack,
  ModalFooter
  , Button,
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

const NewAddress = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const { data: cityData, loading: citiesLoading } = useQuery(getCities);
  const [fetchCounty, { data: countyData, loading: countiesLoading }] = useLazyQuery(getCounties);
  const [fetchDistrict, { data: districtData, loading: districtsLoading }] = useLazyQuery(getDistricts);
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
      console.error(error);
      if (error.message) {
        setErrors({ addAddress: error.message });
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
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton />
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
                Object.entries(values).forEach(([key, val]) => {
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
                  />

                  <SelectField
                    name="district"
                    placeholder={districtsLoading ? t('loading') : t('district')}
                    disabled={districtsLoading || !values.city || !values.county}
                    label={`${t('district')}*`}
                    options={(districtData && districtData.districts) || []}
                  />

                  <InputField
                    name="address"
                    placeholder={t('address')}
                    textArea
                    label={`${t('address')}*`}
                  />

                  <HStack spacing={5}>
                    <InputField
                      name="floor"
                      placeholder={t('floor')}
                      type="number"
                      label={`${t('floor')}*`}
                    />

                    <InputField
                      name="flat"
                      placeholder={t('flat')}
                      type="number"
                      label={`${t('flat')}*`}
                    />
                  </HStack>
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
  onClose: PropTypes.func.isRequired
};

export default NewAddress
