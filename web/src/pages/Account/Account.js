import React from 'react';
import PropTypes from 'prop-types';
import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import Addresses from '../../components/Address/List';
import CreditCards from '../../components/CreditCard/List';
import { useQuery } from '@apollo/client';
import { myAddresses } from '../../graphql/queries';
import { useTranslation } from 'react-i18next';

const Account = ({ selected }) => {
  const { t } = useTranslation();
  //Get saved addresses of user
  const { data, error, loading } = useQuery(myAddresses);

  if (error) {
    <Box textAlign="center">
      <Heading size="lg">{t('serverError')}</Heading>
    </Box>
  }

  const renderSelected = () => {
    if (selected === 'myAddresses') {
      if (loading) {
        return (
          <Center h="100%">
            <Spinner color="pink.500" size="lg" />
          </Center>
        )
      }
      return <Addresses addresses={data.myAddresses || []} />;
    } else if (selected === 'myCards') {
      return <CreditCards />;
    }

    return null;
  };

  return (
    <Box
      display={{ base: 'none', md: 'block' }}
      w="650px"
      h="650px"
      overflowY="scroll"
      p={3}
    >
      {
        renderSelected()
      }
    </Box>
  );
}

Account.propTypes = {
  selected: PropTypes.string.isRequired
};

export default Account;
