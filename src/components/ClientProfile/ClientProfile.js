import React from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import './index.css'
import EditIcon from '@mui/icons-material/Edit';

const ClientProfile = () => {
    return (
        <>
            <Box className="client_profile_main_section">
                <Box className="d-flex justify-content-between p-4">
                    <Typography className="profile_section_heading" variant="span">Account</Typography>
                    <EditIcon className="circular_icon" />
                </Box>
                <Box className="d-flex row">
                    <Box className="d-flex column w-50 align-items-end p-3" >
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                        <Box className="d-flex row px-2">
                            <Typography variant='span' className="mb-2 profile_section_heading">Robert Downey Jr</Typography>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Job Role</Typography>
                                <Typography variant='span' className='profile_section_heading'>Sr. Developer</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="d-flex column w-50 align-items-end p-3 ">
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Email</Typography>
                                <Typography variant='span' className='profile_section_heading'>robertdowneyjr@gmail.com</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
            <Box className="client_profile_main_section">
                <Box className="d-flex justify-content-between p-4">
                    <Typography className="profile_section_heading" variant="span">Company details</Typography>
                    <EditIcon className="circular_icon" />
                </Box>
                <Box className="d-flex row">
                    <Box className="d-flex column w-50 align-items-end p-3" >
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Company Name</Typography>
                                <Typography variant='span' className='profile_section_heading'>Robert Downey Jr Ltd.</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Company Size </Typography>
                                <Typography variant='span' className='profile_section_heading'>2-9 employees</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="d-flex column w-50 align-items-end p-3 ">
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Website</Typography>
                                <Typography variant='span' className='profile_section_heading'>www.abc.com</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Email</Typography>
                                <Typography variant='span' className='profile_section_heading'>robertdowneyjr@gmail.com</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="client_profile_main_section">
                <Box className="d-flex justify-content-between p-4">
                    <Typography className="profile_section_heading" variant="span">Company contacts</Typography>
                    <EditIcon className="circular_icon" />
                </Box>
                <Box className="d-flex row">
                    <Box className="d-flex column w-50 align-items-end p-3" >
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Phone</Typography>
                                <Typography variant='span' className='profile_section_heading'>+1 1234567890</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Country </Typography>
                                <Typography variant='span' className='profile_section_heading'>United State</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>State </Typography>
                                <Typography variant='span' className='profile_section_heading'>New York</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Address </Typography>
                                <Typography variant='span' className='profile_section_heading'>West Irondequoit,Irondequoit, NY, USA</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="d-flex column w-50 align-items-end p-3 ">
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Skype</Typography>
                                <Typography variant='span' className='profile_section_heading'>https://join.skype.com/invite/ABCD1EFGHi</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>City</Typography>
                                <Typography variant='span' className='profile_section_heading'>Rochester</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Zip/Postal Code</Typography>
                                <Typography variant='span' className='profile_section_heading'>14602</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ClientProfile