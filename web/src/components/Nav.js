import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthProvider';
import { Button } from '@chakra-ui/button';
import Brand from './Brand';
import { Icon, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ArrowBackIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { logoutMutation } from '../graphql/mutations';
import { useCart } from '../cart/CartProvider';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logout] = useMutation(logoutMutation)
  const { t } = useTranslation();
  const auth = useAuth();
  const { cartTotal } = useCart();

  return (
    <Box>
      <Flex
        bg="gray.300"
        h="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
      >
        <Box w="50%" data-cy="navbar-fooder-container">
          <Brand containerStyles={{ mb: 0, w: '200px', justifyContent: 'flex-start' }} onClick={() => navigate('/')} />
        </Box>
        <HStack
          w="50%"
          justify="flex-end"
          spacing={5}
        >
          {
            auth.user && location.pathname !== '/restaurants' && (
              <Button
                variant="link"
                colorScheme="pink"
                display={{ base: 'none', md: 'block' }}
                fontSize={['sm', 'md']}
                data-cy="navbar-go-back-to-restaurants-btn"
                onClick={() => navigate('/restaurants')}
              >
                <ArrowBackIcon mr={1} />
                {t('restaurants')}
              </Button>
            )
          }
          {
            auth.user && (
              <Button
                variant="link"
                _hover={{ textStyle: 'none' }}
                colorScheme="pink"
                p={1.5}
                fontSize={['10px', 'sm']}
                onClick={() => navigate('/cart')}
              >
                <Icon as={() => (
                  <Image
                    src="/shopping_cart.svg"
                    alt="Cart"
                    boxSize={["20px", "23px", "25px"]}
                  />
                )}
                />
                <Text
                  top={-3}
                  left={-1.05}
                  position="relative"
                >
                  {cartTotal.toFixed(2)}$
                </Text>
              </Button>
            )
          }
          {auth.user ? (
            <Menu>
              <MenuButton
                _hover={{ textDecoration: 'underline' }}
                lineHeight="normal"
                fontWeight="semibold"
                fontSize={['sm', 'md']}
                color="teal.500"
                data-cy="navbar-user-btn"
              >
                <HStack spacing={1}>
                  <Text>{auth.user.name}</Text>
                  <Text display={{ base: 'none', sm: 'block' }}>{auth.user.surname}</Text>
                  <ChevronDownIcon />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<Image src="/profile.svg" alt="Profile" boxSize="15px" />}
                  data-cy="navbar-go-to-account-btn"
                  onClick={() => navigate('/account')}
                >
                  {t('account')}
                </MenuItem>
                <MenuItem
                  data-cy="navbar-logout-btn"
                  icon={<Image src="/logout.svg" alt="Logout" boxSize="15px" />}
                  onClick={async () => {
                    try {
                      const res = await logout();
                      if (res) {
                        auth.setUser(null);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  }
                >
                  {t('logout')}
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                variant="link"
                colorScheme="teal"
                data-cy="navbar-login-btn"
                onClick={() => navigate('/login')}
              >
                {t('login')}
              </Button>
              <Button
                variant="link"
                colorScheme="teal"
                data-cy="navbar-register-btn"
                onClick={() => navigate('/register')}
              >
                {t('register')}
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box >
  )
}

export default Nav
