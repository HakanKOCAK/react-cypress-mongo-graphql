import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import Addresses from '../../components/Address/List';
import CreditCards from '../../components/CreditCard/List';

const Account = ({ selected }) => {

  const renderSelected = () => {
    if (selected === 'myAddresses') {
      return <Addresses />;
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
