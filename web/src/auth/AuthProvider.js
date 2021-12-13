import React, {
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';
import { useQuery } from '@apollo/client';
import { me } from '../graphql/queries';

//This a wrapper component to check if there is an authenticated user

const AuthContext = createContext({ user: null, setUser: () => null });

export const useAuth = () => {
  return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data } = useQuery(me);


  useEffect(() => {
    if (data && data.me) setUser(data.me);
  }, [data]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export default AuthProvider
