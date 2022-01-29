import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

const AccountWrapper = ({ Children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedOnRender = () => {
    const { pathname } = location;
    switch (pathname) {
      case '/account/addresses':
        return 'myAddresses';
      case '/account/credit-cards':
        return 'myCards';
      case '/account/orders':
        return 'myOrders'

      default:
        return 'myAddresses';
    }
  }
  const [selected, setSelected] = useState(getSelectedOnRender());

  const list = [
    {
      id: 'myAddresses',
      route: '/account/addresses',
      icon: 'profile.svg'
    },
    {
      id: 'myCards',
      route: '/account/credit-cards',
      icon: 'credit_card.svg'
    },
    {
      id: 'myOrders',
      route: '/account/orders',
      icon: 'orders.svg'
    }
  ]

  const getStyle = (isSelected) => {
    let style = {
      my: 2,
      p: 2,
      w: '100%',
      borderRadius: 'md'
    }
    if (isSelected) {
      return {
        ...style,
        fontWeight: 'semibold',
        bg: 'teal.100'
      }
    }

    return style;
  }

  const handleClick = ({ id = '', route = '' }) => {
    setSelected(id);
    navigate(route);
  };

  return (
    <>
      {location.pathname !== '/account' && (
        <Button
          display={{ base: 'block', md: 'none' }}
          variant="link"
          mb={2}
          colorScheme="pink"
          onClick={() => navigate('/account')}
        >
          <ArrowBackIcon />
          {t('account')}
        </Button>
      )}
      {location.pathname === '/account' && (
        <Button
          display={{ base: 'block', md: 'none' }}
          variant="link"
          mb={2}
          colorScheme="pink"
          onClick={() => navigate('/restaurants')}
        >
          <ArrowBackIcon />
          {t('restaurants')}
        </Button>
      )}
      <Box display="flex" flexDirection="row" justifyContent="center">
        <VStack
          display={
            location.pathname === '/account' ?
              {}
              : { base: 'none', md: 'block' }
          }
          w={['100%', '100%', '280px']}
          alignItems="flex-start"
          bg="white"
          boxShadow="md"
          p={5}
          h="650px"
        >
          <Heading size="sm">{t('myAccount')}</Heading>
          <List p={3} w="100%">
            {
              list.map((item, index) => (
                <ListItem
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                  key={index}
                  data-cy={`${item.id}-btn`}
                  {...getStyle(selected === item.id)}
                  onClick={() => handleClick({ id: item.id, route: item.route })}
                >
                  <HStack>
                    <ListIcon as={() => <Image src={`/${item.icon}`} alt="Cypress" boxSize="20px" />} />
                    <Text>
                      {t(item.id)}
                    </Text>
                  </HStack>
                </ListItem>
              ))
            }
          </List>
        </VStack>
        <Children selected={selected} setSelected={setSelected} />
      </Box>
    </>
  )
}

AccountWrapper.propTypes = {
  Children: PropTypes.func.isRequired
}

export default AccountWrapper
