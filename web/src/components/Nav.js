import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, HStack } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthProvider';
import { Button } from '@chakra-ui/button';
import Brand from './Brand';
import { Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { logoutMutation } from '../graphql/mutations';

const Nav = () => {
  const navigate = useNavigate();
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
          <Brand containerStyles={{ mb: 0, w: '200px' }} onClick={() => navigate('/')} />
        </Box>
        <HStack
          w="50%"
          justify="flex-end"
          spacing={5}
        >
          {auth.user ? (
            <Menu>
              <MenuButton
                _hover={{ textDecoration: 'underline' }}
                lineHeight="normal"
                fontWeight="semibold"
                fontSize="md"
                color="teal.500"
              >
                {auth.user.name} {auth.user.surname} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<Image src="logout.svg" alt="Logout" boxSize="15px" />}
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
    </Box>
  )
}

export default Nav
