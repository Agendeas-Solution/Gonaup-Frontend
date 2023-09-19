import React, { useEffect, useState, Suspense } from 'react'
import AppContent from '../container/AppContent'
import Cookie from 'js-cookie'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Header from '../Header/Header'
import { PERMISSION } from '../../constants/permissionConstant'
import HeaderLogo from '../HeaderLogo/HeaderLogo'
import SuccessSnackbar from '../SuccessSnackbar/SuccessSnackbar'
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar'
const DefaultLayout = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    const location = useLocation();
    const routePath = location.pathname;
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            setScreenHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    if (!Cookie.get('userToken')) {
        return <Navigate to="/login" />
    }
    return (
        <>
            {screenWidth > 400 ? (
                <Box>
                    {PERMISSION.HEADER_DISPLAY_SETTING.some(item => item.path === routePath) ? <HeaderLogo /> : <Header />}
                    <Box className={'width-main'}>
                        <AppContent />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{ height: '100vh' }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Typography>Please use Bigger Screen for better visual.</Typography>
                </Box>
            )}

            <SuccessSnackbar />
            <ErrorSnackbar />
        </>
    )
}

export default DefaultLayout
