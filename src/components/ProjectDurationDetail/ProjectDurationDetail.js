import React, { useState } from 'react'
import Header from '../Header/Header'
// import './index.css';
import { Box, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';

const ProjectDurationDetail = () => {
    const [projectDurationDetail, setProjectDurationDetail] = useState({
        experienceNeeded: 1,
        projectDuration: 2,
        hourePerWeek: 1,
        projectId: 2,
        isPublished: true
    })
    const { mutate: UpdateProjectRequirement } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    UpdateProjectRequirement({
        url: 'project/requirements',
        method: 'get',
        headers: {
            Authorization: `${Cookie.get('userToken')}`,
        },
    })
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
                            <FormControlLabel value="0" control={<Radio />} label="Entry" />
                            <FormControlLabel value="1" control={<Radio />} label="Intermediate" />
                            <FormControlLabel value="2" control={<Radio />} label="Expert" />
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
                            <FormControlLabel value="0" control={<Radio />} label="less than 1 months" />
                            <FormControlLabel value="1" control={<Radio />} label="1 to 3 months" />
                            <FormControlLabel value="3" control={<Radio />} label="3 to 6 months" />
                            <FormControlLabel value="6" control={<Radio />} label="More than 6 months" />
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
                            <FormControlLabel value="0" control={<Radio />} label="I'm not sure" />
                            <FormControlLabel value="1" control={<Radio />} label="Less than 30 hrs/week" />
                            <FormControlLabel value="2" control={<Radio />} label="More than 30 hrs/week" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </>
    )
}

export default ProjectDurationDetail
