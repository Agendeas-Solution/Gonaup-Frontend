import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Stack from '@mui/material/Stack'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import './index.css'
import Logo from '../../assets/images/logo.svg'
const Header = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box className="company_logo">
                <img src={Logo} alt="Company logo" />
            </Box>
        </>
    )
}

export default Header
