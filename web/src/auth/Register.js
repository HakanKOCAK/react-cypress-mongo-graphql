import React from 'react'
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import {
  Box,
  Center,
  Heading,
  VStack,
  Text,
  GridItem
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { isEmailValid } from '../utils/regExp';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Brand from '../components/Brand';
import { registerMutation } from '../graphql/mutations';
import { useToken } from './TokenProvider';
import { me } from '../graphql/queries';


const Register = () => {
  const { setAccessToken } = useToken();
  const { t } = useTranslation();

  const [register] = useMutation(registerMutation)

  const handleSubmit = async ({ name, surname, email, password, confirmPassword }, { setErrors }) => {
    //Check if passwords match
    if (password !== confirmPassword) {
      setErrors({ passwordsDontMatch: t('passwordsDontMatch') });
      return;
    }

    //Try to register and update apollo store with querying me endpoint if successful
    try {
      const res = await register({
        variables: {
          name,
          surname,
          email,
          password
        },
        update: async (store, { data }) => {
          if (!data) {
            return
          }
          if (data && data.register) {
            const { id, name, surname, email } = data.register;

            await store.writeQuery({
              query: me,
              data: {
                me: {
                  id,
                  name,
                  surname,
                  email
                }
              }
            })
          }
        }
      });

      if (res && res.data && res.data.register) {
        setAccessToken(res.data.register.accessToken)
      }
    } catch (error) {
      console.error(error);
      if (error.message) {
        setErrors({ register: error.message });
      }
    }
  };

  return (
    <GridItem colSpan={1}>
      <Center h="100%" boxShadow="xl" rounded="md" bg="white">
        <VStack p={5} w="100%">
          <Brand />

          <Center mb={5}>
            <Heading size="sm">{t('register')}</Heading>
          </Center>

          <Box >
            <Formik
              initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validate={({ email, name, surname, password, confirmPassword }) => {
                const errors = {};

                if (!name) {
                  errors.name = t('required');
                }

                if (!surname) {
                  errors.surname = t('required');
                }

                if (password.length < 6) {
                  errors.password = `${t('invalidPassword')}, ${t('minLength')}: 6`
                }

                if (confirmPassword.length < 6) {
                  errors.confirmPassword = `${t('invalidPassword')}, ${t('minLength')}: 6`
                }

                if (!email) {
                  errors.email = t('required');
                } else if (!isEmailValid(email)) {
                  errors.email = t('invalidEmail');
                }

                return errors;
              }}

              onSubmit={handleSubmit}
            >
              {({ errors, isSubmitting }) => (
                <Form>
                  <InputField
                    name="name"
                    placeholder={t('name')}
                    label={t('name')}
                  />

                  <Box mt={4}>
                    <InputField
                      name="surname"
                      placeholder={t('surname')}
                      label={t('surname')}
                    />
                  </Box>

                  <Box mt={4}>
                    <InputField
                      name="email"
                      placeholder={t('email')}
                      label={t('email')}
                    />
                  </Box>

                  <Box mt={4}>
                    <InputField
                      name="password"
                      placeholder={t('password')}
                      label={t('password')}
                      type="password"
                    />
                  </Box>

                  <Box mt={4}>
                    <InputField
                      name="confirmPassword"
                      placeholder={t('confirmPassword')}
                      label={t('confirmPassword')}
                      type="password"
                    />
                  </Box>

                  <Center mt={4}>
                    {errors.register && (
                      <Text size="sm" color="red.500">{t(errors.register)}</Text>
                    )}
                    {errors.passwordsDontMatch && (
                      <Text size="sm" color="red.500">{t(errors.passwordsDontMatch)}</Text>
                    )}
                  </Center>

                  <Box mt={4}>
                    <Text>{t('alreadyHaveAnAccount')} <Link to="/login" style={{ color: '#3182CE' }}>{t('login')}</Link></Text>
                  </Box>

                  <Center mt={4}>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      {t('register')}
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
          </Box>
        </VStack>
      </Center >
    </GridItem >
  )
}

export default Register
