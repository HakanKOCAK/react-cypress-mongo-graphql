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
import { loginMutation } from '../graphql/mutations';
import { me } from '../graphql/queries';
import { Link } from 'react-router-dom';
import { useToken } from './TokenProvider';
import Brand from '../components/Brand';


const Login = () => {
    const { setAccessToken } = useToken();
    const { t } = useTranslation();

    const [login] = useMutation(loginMutation)

    const handleSubmit = async ({ email, password }, { setErrors }) => {
        //Check password length
        if (password.length < 6) {
            setErrors({ password: `${t('invalidPassword')}, ${t('minLength')}: 6` });
            return;
        }

        //Try to login and update apollo store with querying me endpoint if successful
        try {
            const res = await login({
                variables: {
                    email,
                    password
                },
                update: async (store, { data }) => {
                    if (!data) {
                        return
                    }
                    if (data && data.login) {
                        const { id, name, surname, email } = data.login;

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
                        });
                    }

                }
            });

            if (res && res.data && res.data.login) {
                setAccessToken(res.data.login.accessToken)
            }
        } catch (error) {
            console.error(error);
            if (error.message) {
                setErrors({ login: error.message });
            }
        }
    };

    return (
        <GridItem colSpan={1}>
            <Center h="100%" boxShadow="xl" rounded="md" bg="white">
                <VStack p={5}>
                    <Brand />

                    <Center mb={5}>
                        <Heading size="sm">{t('login')}</Heading>
                    </Center>

                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validate={({ email }) => {
                            const errors = {};

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
                                    name="email"
                                    placeholder={t('email')}
                                    label={t('email')}
                                />
                                <Box mt={4}>
                                    <InputField
                                        name="password"
                                        placeholder={t('password')}
                                        label={t('password')}
                                        type="password"
                                    />
                                </Box>
                                {errors.login && (
                                    <Center mt={4}>
                                        <Text size="sm" color="red.500">{t(errors.login)}</Text>
                                    </Center>
                                )}

                                <Box mt={4}>
                                    <Text>{t('dontHaveAnAccount')} <Link to="/register" style={{ color: '#3182CE' }}>{t('register')}</Link></Text>
                                </Box>
                                <Center mt={4}>
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        colorScheme="teal"
                                    >
                                        {t('login')}
                                    </Button>
                                </Center>
                            </Form>
                        )}
                    </Formik>
                </VStack>
            </Center >
        </GridItem>
    )
}

export default Login
