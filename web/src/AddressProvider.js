import React, {
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';
import { useQuery } from '@apollo/client';
import { Box, Center, Heading } from '@chakra-ui/react';
import Loading from './components/Loading';
import { useTranslation } from 'react-i18next';
import { myAddresses } from './graphql/queries';
import { isEmpty } from 'lodash';
import { useAuth } from './auth/AuthProvider';

//Custom address context
const AddressContext = createContext({
  details: {
    address: '',
    city: '',
    county: '',
    district: '',
    flat: -1,
    floor: -1,
    id: '',
    title: ''
  },
  setDetails: () => null,
  myAddresses: []
});

//To be able to use address context in child components.
export const useAddress = () => {
  return useContext(AddressContext);
};

const AddressProvider = ({ children }) => {
  const { t } = useTranslation();

  const { user } = useAuth();
  //Get saved addresses of user
  const { data, error, loading } = useQuery(myAddresses, {
    skip: !user
  });

  const [details, setDetails] = useState({
    address: '',
    city: '',
    county: '',
    district: '',
    flat: -1,
    floor: -1,
    id: '',
    title: ''
  });

  const [userAddresses, setUserAddresses] = useState([]);

  useEffect(() => {
    //Check if an address is saved to local storage before and if so check if user still have the address
    const lastAddress = localStorage.getItem('fooder.last.address');
    if (lastAddress && !isEmpty(data)) {
      let parsedAddress = {}
      try {
        parsedAddress = JSON.parse(lastAddress);
      } catch (error) {
        console.log(error);
      }
      setDetails(data.myAddresses.find((a) => a.id === parsedAddress.id) || {});
    }

    if (!isEmpty(data)) {
      setUserAddresses(data.myAddresses);
    }
  }, [data]);

  if (loading) {
    return <Center h="100vh" ><Loading /></Center>;
  }

  if (error) {
    console.log(error);
    return (
      <Box textAlign="center">
        <Heading size="lg">{t('serverError')}</Heading>
      </Box>
    );
  }

  return <AddressContext.Provider value={{ details, setDetails, myAddresses: userAddresses }}>{children}</AddressContext.Provider>
}

export default AddressProvider
