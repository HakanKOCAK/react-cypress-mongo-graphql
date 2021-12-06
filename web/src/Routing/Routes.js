import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import Login from '../auth/Login'
import Register from '../auth/Register';
import Home from '../Home';
import AuthProvider from '../auth/AuthProvider';
import Nav from '../Nav';
import { Box } from '@chakra-ui/layout';
import AuthWrapper from '../components/AuthWrapper';

export default function AppRoutes() {
    const height = window.innerHeight;
    return (
        <Box h={`${height}px`}>
            <BrowserRouter>
                <AuthProvider>
                    <Nav />
                    <Box h={`${parseInt(height) - 60}px`} w="100%" p={5} overflowY>
                        <Routes>
                            <Route path="/" element={<Navigate replace to="/home" />} />
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
                                exact path='/home'
                                element={
                                    <PrivateRoute>
                                        <Home />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </Box>
                </AuthProvider>
            </BrowserRouter>
        </Box>
    )
}
