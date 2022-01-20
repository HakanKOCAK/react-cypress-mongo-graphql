import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/layout';
import Nav from '../components/Nav';
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';

import AuthProvider from '../auth/AuthProvider';
import PrivateRoute from './Private';
import PublicRoute from './Public';

import AuthWrapper from '../components/AuthWrapper';
import Login from '../pages/Login'
import Register from '../pages/Register';

import Restaurants from '../pages/Restaurant/Restaurants';
import Account from '../pages/Account/Account';

import AccountWrapper from '../components/AccountWrapper';
import Addresses from '../pages/Account/Addresses';
import CreditCards from '../pages/Account/CreditCards';
import { Restaurant } from '../pages/Restaurant/Restaurant';
import RestaurantLayout from '../pages/Restaurant/RestaurantLayout';

import Cart from '../pages/Cart';
import CartProvider from '../cart/CartProvider';

export default function AppRoutes() {
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    return (
        <Box h={`${height}px`}>
            <BrowserRouter>
                <AuthProvider>
                    <CartProvider>
                        <Nav />
                        <Box h={`${parseInt(height) - 69}px`} w="100%" p={5} overflowY>
                            <Routes>
                                <Route exact path="/" element={<Navigate replace to="/restaurants" />} />
                                <Route
                                    exact path='/login'
                                    element={
                                        <PublicRoute>
                                            <AuthWrapper>
                                                <Login />
                                            </AuthWrapper>
                                        </PublicRoute>
                                    }
                                />
                                <Route
                                    exact path='/register'
                                    element={
                                        <PublicRoute>
                                            <AuthWrapper>
                                                <Register />
                                            </AuthWrapper>
                                        </PublicRoute>
                                    }
                                />
                                <Route
                                    exact path='/restaurants'
                                    element={
                                        <PrivateRoute>
                                            <RestaurantLayout />
                                        </PrivateRoute>
                                    }
                                >
                                    <Route
                                        path="/restaurants/:restaurantId"
                                        element={
                                            <PrivateRoute>
                                                <Restaurant />
                                            </PrivateRoute>
                                        }
                                    />
                                    <Route
                                        index
                                        element={
                                            <PrivateRoute>
                                                <Restaurants />
                                            </PrivateRoute>
                                        }
                                    />
                                </Route>

                                <Route
                                    exact path='/account'
                                    element={
                                        <PrivateRoute>
                                            <AccountWrapper Children={Account} />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    exact path='/account/addresses'
                                    element={
                                        <PrivateRoute>
                                            <AccountWrapper Children={Addresses} />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    exact path='/account/credit-cards'
                                    element={
                                        <PrivateRoute>
                                            <AccountWrapper Children={CreditCards} />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    exact path='/cart'
                                    element={
                                        <PrivateRoute>
                                            <Cart />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </Box>
                    </CartProvider>
                </AuthProvider>
            </BrowserRouter>
        </Box>
    )
}
