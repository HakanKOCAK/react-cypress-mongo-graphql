import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthProvider';
import { Button } from '@chakra-ui/button';
import Brand from './Brand';
import { Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ArrowBackIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { logoutMutation } from '../graphql/mutations';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logout] = useMutation(logoutMutation)
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Box>
      <Flex
        bg="gray.300"
        h="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
      >
        <Box w="50%">
          <Brand containerStyles={{ mb: 0, w: '200px', justifyContent: 'flex-start' }} onClick={() => navigate('/')} />
        </Box>
        <HStack
          w="50%"
          justify="flex-end"
          spacing={5}
        >
          {
            auth.user && location.pathname !== '/home' && (
              <Button
                variant="link"
                colorScheme="pink"
                fontSize={['sm', 'md']}
                onClick={() => navigate('/home')}
              >
                <ArrowBackIcon mr={1} />
                {t('home')}
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
                  onClick={() => navigate('/account')}
                >
                  {t('account')}
                </MenuItem>
                <MenuItem
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
                onClick={() => navigate('/login')}
              >
                {t('login')}
              </Button>
              <Button
                variant="link"
                colorScheme="teal"
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
