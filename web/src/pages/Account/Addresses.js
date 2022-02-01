import React from 'react';
import AddressList from '../../components/Address/List';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { myAddresses } from '../../graphql/queries';
import { useTranslation } from 'react-i18next';

const Addresses = ({ width }) => {
  const { t } = useTranslation();
  //Get saved addresses of user
  const { data, error, loading } = useQuery(myAddresses);

  if (error) {
    <Box textAlign="center">
      <Heading size="lg">{t('serverError')}</Heading>
    </Box>
  }
  return (
    <Box
      w="650px"
      h="650px"
      overflowY="scroll"
      p={3}
    >
      {loading ? (
        <Spinner color="pink.500" size="lg" />
      ) : (
        <AddressList addresses={data.myAddresses || []} width={width} />
      )}
    </Box>
  );
}

export default Addresses
