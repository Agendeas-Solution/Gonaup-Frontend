import React, { useState } from 'react'
import Header from '../Header/Header'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import './index.css'

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
const ServiceDetail = () => {
    const [serviceDetail, setServiceDetail] = useState({
        professionalRole: "",
        description: ""
    })
    const navigate = useNavigate();
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
    const { mutate: AddProfileLinks } = useMutation(request, {
        onSuccess: (response) => {
            console.log(response);
            navigate(PERMISSION.DEVELOPER_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
                + 1].path)
            localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus'))
                + 1)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const handleAddServiceDetail = async (e) => {
        await AddProfileLinks({
            url: '/user/freelancer/role',
            method: 'put',
            data: serviceDetail,
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    return (
        <>
            <Box className="main_section">
                <Typography className='main_section_heading' variant='span'>4/7</Typography>
                <Typography className='main_section_heading' variant='span'>Craft Your Professional Identity</Typography>
                <Typography className='main_section_description' >Define your professional role and let the world know what you do best. Our platform provides a dedicated space for you to add a
                    compelling description of your skills, expertise, and unique value proposition.</Typography>
                <Box>
                    <InputLabel>Your professional role</InputLabel>
                    <TextField
                        className="service_detail_textfield"
                        placeholder="Software Engineer | Javascript | iOS"
                        value={serviceDetail?.professionalRole}
                        onChange={e => {
                            setServiceDetail({ ...serviceDetail, professionalRole: e.target.value })
                        }}
                        variant="outlined"
                    />
                </Box>
                <Box>
                    <InputLabel>Your overview</InputLabel>
                    <TextField
                        className="service_detail_textfield"
                        placeholder="Enter your top skills, experiences, and interests. This is one 
                    of the first things will see on your profile."
                        value={serviceDetail?.description}
                        onChange={e => {
                            setServiceDetail({ ...serviceDetail, description: e.target.value })
                        }}
                        multiline={3}
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={10} />
                    <Button onClick={handleAddServiceDetail} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default ServiceDetail