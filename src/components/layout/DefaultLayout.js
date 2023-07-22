import React, { useEffect, useState } from 'react'
import AppContent from '../container/AppContent'
import Cookie from 'js-cookie'
import { Navigate } from 'react-router-dom'
import Header from '../Header/Header'
import { Box, Typography } from '@mui/material'
const DefaultLayout = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
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
                    <Header />
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
        </>
    )
}

export default DefaultLayout
