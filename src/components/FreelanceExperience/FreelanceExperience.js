import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, createFilterOptions, FormControl, Select, MenuItem } from '@mui/material'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { request } from '../../utils/axios-utils'
const FreelanceExperience = () => {
    const [freelancerExperienceDetail, setFreelancerExperienceDetail] = useState({
        frameworkId: null,
        experiencedYears: null,
        projectLinks: [],
        description: ''
    })
    const [frameWorkList, setFrameWorkList] = useState([])
    const addLink = () => {
        const newLinks = [...freelancerExperienceDetail.projectLinks];
        newLinks.push('');
        setFreelancerExperienceDetail({ ...freelancerExperienceDetail, projectLinks: newLinks });
    };
    const updateLink = (index, value) => {
        const newLinks = [...freelancerExperienceDetail.projectLinks];
        newLinks[index] = value;
        setFreelancerExperienceDetail({ ...freelancerExperienceDetail, projectLinks: newLinks });
    };
    const removeLink = (index) => {
        const newLinks = [...freelancerExperienceDetail.projectLinks];
        newLinks.splice(index, 1);
        setFreelancerExperienceDetail({ ...freelancerExperienceDetail, projectLinks: newLinks });
    };
    const { mutate: GetFrameWorkList } = useMutation(request, {
        onSuccess: (res) => {
            setFrameWorkList(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const { mutate: AddFreeLanceExperience } = useMutation(request, {
        onSuccess: (res) => {

        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetFrameWorkList({
            url: '/search/framework/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleAddExperience = async (e) => {
        await AddFreeLanceExperience({
            url: '/user/freelancer/experience',
            method: 'post',
            data: freelancerExperienceDetail,
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    };
    return (
        <>
            <Box className="register_section">
                <Box className="register_right_section">
                    <Box className="register_main_section">
                        <Box className="heading_section">
                            <Typography className="main_heading" variant="span">
                                Welcome To Gonaup.
                            </Typography>
                            <Typography
                                sx={{ color: '#8E8E8E', fontSize: '15px' }}
                                variant="span"
                            >
                                Let's register with Gonaup and get a 14-day free trial to manage
                                a business.
                            </Typography>
                        </Box>
                        <Box className="register_main_section">
                            <Box className="register_page_fields">
                                <FormControl className="dialogue_input_fields">
                                    <Select
                                        placeholder="FrameworkId"
                                        value={freelancerExperienceDetail?.frameworkId}
                                        onChange={e => {
                                            setFreelancerExperienceDetail({
                                                ...freelancerExperienceDetail,
                                                frameworkId: e.target.value,
                                            })
                                        }}
                                    >
                                        {frameWorkList &&
                                            frameWorkList.map(data => {
                                                return <MenuItem value={data?.id}>{data?.name}</MenuItem>
                                            })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    className="register_input_fields"
                                    label="Experienced Years"
                                    placeholder="Experienced Years"
                                    type='number'
                                    value={freelancerExperienceDetail?.experiencedYears}
                                    onChange={e => {
                                        setFreelancerExperienceDetail({ ...freelancerExperienceDetail, experiencedYears: e.target.value })
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                            <Box className="register_page_fields">

                                <TextField
                                    className="register_input_fields"
                                    label="Description"
                                    type={'text'}
                                    value={freelancerExperienceDetail?.description}
                                    onChange={e => {
                                        setFreelancerExperienceDetail({ ...freelancerExperienceDetail, description: e.target.value })
                                    }}
                                />
                            </Box>
                            {freelancerExperienceDetail.projectLinks.map((link, index) => (
                                <div key={index}>
                                    <TextField
                                        label={`Link ${index + 1}`}
                                        value={link}
                                        onChange={(e) => updateLink(index, e.target.value)}
                                    />
                                    <Button
                                        sx={{ width: '30%' }}
                                        variant='contained' onClick={() => removeLink(index)}>Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                sx={{ width: '10%' }}
                                variant='contained' onClick={addLink}><AddRoundedIcon /></Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                sx={{ width: '30%' }}
                                onClick={handleAddExperience}
                                variant="contained"
                            >
                                Add Experience
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default FreelanceExperience;