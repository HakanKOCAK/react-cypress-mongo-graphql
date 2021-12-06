import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, HStack } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { useAuth } from './auth/AuthProvider';
import { Button } from '@chakra-ui/button';
import Brand from './components/Brand';

const Nav = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const user = useAuth();

  return (
    <Box>
      <Flex
        bg="gray.300"
        h="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
      >
        <Box flex={{ base: 1 }}>
          <Brand containerStyles={{}} onClick={() => navigate('/')} />
        </Box>
        <HStack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          spacing={6}
        >
          {user ? (
            <Button onClick={() => navigate('/login')}>profile</Button>
          ) : (
            <>
              <Button
                w="100px"
                colorScheme="teal"
                onClick={() => navigate('/login')}
              >
                {t('login')}
              </Button>
              <Button
                w="100px"
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
