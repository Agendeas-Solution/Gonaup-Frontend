import React, { useEffect } from 'react'
import { Box, TextField, Typography, Button } from '@mui/material'
import './index.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { PERMISSION } from '../../constants/permissionConstant';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#0971f1',
            darker: '#053e85',
        },
    },
});
const ProfileLinks = () => {
    const navigate = useNavigate()
    const [profileLink, setProfileLink] = useState({
        githubProfile: "",
        linkdinProfile: "",
        freelanceProfile: ""
    })
    const { mutate: AddProfileLinks } = useMutation(request, {
        onSuccess: (response) => {
            navigate(PERMISSION.DEVELOPER_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
                + 1].path)
            localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus')) + 1)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const handleAddProfileLink = async (e) => {
        await AddProfileLinks({
            url: '/user/freelancer/profile-links',
            method: 'put',
            data: profileLink,
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const handleBackPage = () => {
        navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
            - 1].path)
        localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus')) - 1)
    }
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <ThemeProvider theme={theme}>
                        <LinearProgress color="secondary" variant="determinate" {...props} />
                    </ThemeProvider>
                </Box>
            </Box>
        );
    }
    LinearProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };
    return (
        <>
            <Box className="main_section">
                <Typography className="main_section_heading" variant='span'>1/7</Typography>
                <Typography className="main_section_heading" variant='span'>Connect with the World's Finest Talent</Typography>
                <Typography className="main_section_description" variant='span'>Share your GitHub, LinkedIn, or any other profile link. By providing this valuable insight of your professional background, we efficiently match you with ideal opportunities.</Typography>
                <Box className="mb-3">
                    <TextField
                        label="Your GitHub Profile Link"
                        className="profile_link_textfield"
                        value={profileLink?.githubProfile}
                        onChange={e => {
                            setProfileLink({ ...profileLink, githubProfile: e.target.value })
                        }}
                        variant="outlined" />
                </Box>
                <Box className="mb-3">
                    <TextField
                        label="Your LinkedIn Profile Link"
                        className="profile_link_textfield"
                        value={profileLink?.linkdinProfile}
                        onChange={e => {
                            setProfileLink({ ...profileLink, linkdinProfile: e.target.value })
                        }}
                        variant="outlined" />
                </Box>
                <Box className="mb-3">
                    <TextField
                        label="Ex: Upwork, Freelancer or Fiverr profile link "
                        className="profile_link_textfield"
                        value={profileLink?.freelanceProfile}
                        onChange={e => {
                            setProfileLink({ ...profileLink, freelanceProfile: e.target.value })
                        }}
                        variant="outlined" />
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={10} />
                <Box className="d-flex justify-content-between mt-2 p-1">
                    <Button onClick={handleBackPage} className="back_button">Back</Button>
                    <Button onClick={handleAddProfileLink} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default ProfileLinks