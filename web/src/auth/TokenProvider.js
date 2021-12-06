import React, {
  useEffect,
  useState,
  useContext,
  createContext
} from 'react';
import { Center } from '@chakra-ui/layout';
import Loading from '../components/Loading';

//This is the wrapper component to provide access tokens to apollo client
const TokenContext = createContext({ accessToken: '', setAccessToken: () => null });

export const useToken = () => {
  const token = useContext(TokenContext);
  return token;
};


const TokenProvider = ({ children }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include'
    }).then(async (res) => {
      const toJson = await res.json();
      setValue(toJson.accessToken);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <Center h="100vh" ><Loading /></Center>;
  }

  return <TokenContext.Provider value={{ accessToken: value, setAccessToken: setValue }}>{children}</TokenContext.Provider>
}

export default TokenProvider
