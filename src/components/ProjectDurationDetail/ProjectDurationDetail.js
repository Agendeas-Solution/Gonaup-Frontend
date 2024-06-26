import React, { useContext, useState } from 'react'
// import './index.css';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PERMISSION } from '../../constants/permissionConstant';
import { PROJECT } from '../../constants/projectConstant';
import { useNavigate } from 'react-router-dom';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
const theme = createTheme({
    palette: {
        secondary: {
            main: '#7AC144',
            darker: '#ddd',
        },
    },
});
const ProjectDurationDetail = () => {
    const navigate = useNavigate();
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const [projectDurationDetail, setProjectDurationDetail] = useState({
        experienceNeeded: null,
        projectDuration: null,
        hourePerWeek: null,
        projectId: parseInt(localStorage.getItem('projectId')),
        isPublished: false
    })

    const { mutate: UpdateProjectRequirement } = useMutation(request, {
        onSuccess: (res) => {
            setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.data.message,
            })
        },
        onError: (err) => {
            console.log(err);
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleUpdateProjectRequirement = async () => {
        await UpdateProjectRequirement({
            url: 'project/requirements',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: projectDurationDetail
        })
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
    const handleBackPage = () => {
        console.log("Printing", PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
            - 1])
        debugger;
        navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
            - 1].path)
        localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus')) - 1)
    }
    return (
        <>
            <Box className="main_section">
                <Typography className="main_section_heading" variant='span'>4/4</Typography>
                <Typography className="main_section_heading" variant='span'>
                    Specifying Developer Expertise, Work Hours, Project Duration, and Optimal Hiring Preferences
                </Typography>
                <Typography className="main_section_description" variant='span'>
                    Taking the last steps towards showcasing your expertise and accessing exciting opportunities. Your safety and convenience are our top priorities, and our streamlined process ensures a hassle-free experience.
                </Typography>
                <Box className="d-flex column justify-content-between">
                    <FormControl className="w-25">
                        <FormLabel>Level of experience will it need ?</FormLabel>
                        <RadioGroup
                            value={projectDurationDetail.experienceNeeded}
                            onChange={e => {
                                setProjectDurationDetail({
                                    ...projectDurationDetail,
                                    experienceNeeded: parseInt(e.target.value),
                                })
                            }}>
                            {PROJECT.EXPERIENCE_LEVEL.map((data) => {
                                return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                            })}
                        </RadioGroup>
                    </FormControl>
                    <FormControl className="w-25">
                        <FormLabel>How long will your work take?</FormLabel>
                        <RadioGroup
                            value={projectDurationDetail.projectDuration}
                            onChange={e => {
                                setProjectDurationDetail({
                                    ...projectDurationDetail,
                                    projectDuration: parseInt(e.target.value),
                                })
                            }}>
                            {PROJECT.PROJECT_DURATION.map((data) => {
                                return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                            })}
                        </RadioGroup>
                    </FormControl>
                    <FormControl className="w-25">
                        <FormLabel>Hours per week</FormLabel>
                        <RadioGroup
                            value={projectDurationDetail.hourePerWeek}
                            onChange={e => {
                                setProjectDurationDetail({
                                    ...projectDurationDetail,
                                    hourePerWeek: parseInt(e.target.value),
                                })
                            }}>
                            {
                                PROJECT.HOUR_PER_WEEK.map((data) => {
                                    return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                                })}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={75} />
                <Box className="d-flex justify-content-between mt-2 p-1">
                    <Button onClick={handleBackPage} className="back_button">Back</Button>
                    <Button onClick={handleUpdateProjectRequirement} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default ProjectDurationDetail
