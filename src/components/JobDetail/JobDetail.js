import React, { useState } from 'react'
import { Box, TextField, Typography, Button } from '@mui/material'
import './index.css';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PERMISSION } from '../../constants/permissionConstant';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#7AC144',
            darker: '#ddd',
        },
    },
});

const JobDetail = () => {
    const [projectTitle, setProjectTitle] = useState({
        title: "",
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

    //Add Project Title
    const { mutate: AddProjectTitle } = useMutation(request, {
        onSuccess: (res) => {
            localStorage.setItem('projectId', res?.data?.data?.projectId)
            navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
                + 1].path)
            localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus'))
                + 1)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleAddProjectTitle = () => {
        AddProjectTitle({
            url: '/project/title',
            method: 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: projectTitle
        })
    }
    const handleBackPage = () => {
        navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
            - 1].path)
        localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus')) - 1)
    }
    return (
        <>
            <Box className="main_section">
                <Typography className="main_section_heading" variant='span'>1/4</Typography>
                <Typography className="main_section_heading" variant='span'>Unleash the Power of Your Project with a Captivating Title and a Detailed Description</Typography>
                <Typography className="main_section_description" variant='span'>Share the captivating title and provide a detailed description that brings your vision to life. We can't wait to hear about your exciting project and help you bring it to fruition!"</Typography>
                <Box className="mt-3">
                    <TextField
                        label="Job title"
                        className="job_detail_textfield"
                        value={projectTitle?.title}
                        onChange={e => {
                            setProjectTitle({ ...projectTitle, title: e.target.value })
                        }}
                        variant="outlined"
                    />
                </Box>
                <Box className="mt-3">
                    <TextField
                        label="Describe what you need"
                        className="job_detail_textfield"
                        multiline
                        rows={4}
                        value={projectTitle?.description}
                        onChange={e => {
                            setProjectTitle({ ...projectTitle, description: e.target.value })
                        }}
                        variant="outlined"
                    />
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={0} />
                <Box className="d-flex justify-content-end mt-2 p-1">
                    {/* <Button onClick={handleBackPage} className="back_button">Back</Button> */}
                    <Button onClick={handleAddProjectTitle} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default JobDetail