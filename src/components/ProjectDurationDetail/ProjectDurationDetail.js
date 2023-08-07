import React, { useState } from 'react'
import Header from '../Header/Header'
// import './index.css';
import { Box, Button, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PROJECT } from '../../constants/projectConstant';
import { useNavigate } from 'react-router-dom';
// import { PERMISSION } from '../../constants/permissionConstant';
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
    const [projectDurationDetail, setProjectDurationDetail] = useState({
        experienceNeeded: null,
        projectDuration: null,
        hourePerWeek: null,
        projectId: parseInt(localStorage.getItem('projectId')),
        isPublished: false
    })
    const { mutate: UpdateProjectRequirement } = useMutation(request, {
        onSuccess: (res) => {
            // navigate(PERMISSION.DEVELOPER_PERMISSION_ROUTE[parseInt(localStorage.getItem('signupCompleted'))
            //     + 1].path)
            // localStorage.setItem('signupCompleted', parseInt(localStorage.getItem('signupCompleted'))
            //     + 1)
        },
        onError: (err) => {
            console.log(err);
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
    return (
        <>
            <Box className="main_section">
                <Typography className="main_section_heading" variant='span'>4/4</Typography>
                <Typography className="main_section_heading" variant='span'>Specifying Developer Expertise, Work Hours, Project Duration, and Optimal Hiring Preferences</Typography>
                <Typography className="main_section_description" variant='span'>Taking the last steps towards showcasing your expertise and accessing exciting opportunities. Your safety and convenience are our top priorities, and our streamlined process ensures a hassle-free experience.</Typography>
                <Box className="d-flex column justify-content-between ">
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
                            {PROJECT.HOUR_PER_WEEK.map((data) => {
                                return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                            })}
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={20} />
                    <Button onClick={handleUpdateProjectRequirement} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default ProjectDurationDetail
