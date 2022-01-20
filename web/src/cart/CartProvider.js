import { useQuery } from '@apollo/client';
import { Box, Center, Heading } from '@chakra-ui/react';
import React, {
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import { userCartQuery } from '../graphql/queries';
import { isEmpty } from 'lodash';
import prettifyRestaurantMenu from '../utils/restaurantMenuPrettifier';
import prettifyCart from '../utils/cartPrettifier';

//Custom cart context
const CartContext = createContext({
  details: {
    items: [],
    restaurantDetails: {
      id: '',
      image: '',
      name: '',
      city: '',
      county: '',
      cuisine: [],
      deliveryDetails: {},
      servedDistricts: []
    }
  },
  setDetails: () => null,
  cartTotal: 0,
  setCartTotal: () => null
});

//To be able to use cart context in child components.
export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const { t } = useTranslation();

  //Get saved user address details.
  const userAddressDetails = localStorage.getItem('fooder.last.address');
  const { data, loading, error } = useQuery(userCartQuery, {
    skip: !userAddressDetails, // skip fetching cart details if an adress is not set.
    variables: {
      userDistrict: userAddressDetails ? JSON.parse(userAddressDetails).district : ''
    }
  });

  const [details, setDetails] = useState({
    items: [],
    restaurantDetails: {
      id: '',
      image: '',
      name: '',
      city: '',
      county: '',
      cuisine: [],
      deliveryDetails: {},
      servedDistricts: []
    },
    menu: {}
  });
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    //If cart is fetched but is empty
    if (isEmpty(data) || isEmpty(data.cart)) {
      setDetails({
        items: [],
        restaurantDetails: {
          id: '',
          image: '',
          name: '',
          city: '',
          county: '',
          cuisine: [],
          deliveryDetails: {},
          servedDistricts: []
        },
        menu: {}
      });
      setCartTotal(0);
    } else {
      //Get cart details
      const { cart } = data;

      //Prettify cart
      const prettifiedCart = prettifyCart({ cart });

      //Restaurant might not be set so check and set details if exists 
      setDetails({
        ...prettifiedCart,
        restaurantDetails: cart.restaurantDetails ? cart.restaurantDetails : {
          id: '',
          image: '',
          name: '',
          city: '',
          county: '',
          cuisine: [],
          deliveryDetails: {},
          servedDistricts: []
        },
        menu: prettifyRestaurantMenu({ menu: cart.menu ? cart.menu : {} }) //Prettify restaurant menu
      });
      setCartTotal(cart.cartTotal);
    }
  }, [data]);

  if (loading) {
    return (
      <Center h="80vh">
        <Loading />
      </Center>
    )
  }

  if (error && error.message !== 'authorizationDenied') {
    console.log(error);
    return (
      <Box textAlign="center">
        <Heading size="lg">{t('serverError')}</Heading>
      </Box>
    );
  }

  return <CartContext.Provider value={{ details, setDetails, cartTotal, setCartTotal }}>{children}</CartContext.Provider>
}

export default CartProvider
