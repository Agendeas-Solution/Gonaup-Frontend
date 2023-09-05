import React from 'react'
import Logo from '../../assets/images/logo.svg'
import { Box } from '@mui/material'
import './index.css'
const HeaderLogo = () => {
    return (
        <Box className="company_header_logo">
            <img src={Logo} alt="Company logo" />
        </Box>
    )
}

export default HeaderLogo