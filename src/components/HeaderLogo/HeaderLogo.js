import React from 'react'
import Logo from '../../assets/images/logo.svg'
import { Box } from '@mui/material'

const HeaderLogo = () => {
    return (
        <Box className="company_logo">
            <img src={Logo} alt="Company logo" />
        </Box>
    )
}

export default HeaderLogo