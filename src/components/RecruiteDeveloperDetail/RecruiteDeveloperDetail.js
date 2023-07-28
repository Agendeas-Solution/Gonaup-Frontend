import { Box, Button, Chip, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import './index.css'
import { request } from '../../utils/axios-utils'
import { useMutation } from 'react-query'
import Cookie from 'js-cookie'
import { PROJECT } from '../../constants/projectConstant'
import DoneIcon from '@mui/icons-material/Done';

const RecruiteDeveloperDetail = () => {
    const [recruiteDeveloperDetail, setRecruiteDeveloperDetail] = useState({
        jobRole: "",
        description: "",
        skills: "",
        hourlyRate: null,
    })
    const [selectedSkillSets, setSelectedSkillSets] = useState({
        services: [],
        skills: []
    });
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const { mutate: AddRecruiteDeveloperDetail } = useMutation(request, {
        onSuccess: (res) => {
            localStorage.setItem('projectId', res?.data?.data?.jobId)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const { mutate: GetSkillList } = useMutation(request, {
        onSuccess: (res) => {
            setServiceSkillList((prevState) => ({
                ...prevState,
                skillList: res.data.data,
            }));
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleAddRecruiteDeveloperDetail = async (e) => {
        await AddRecruiteDeveloperDetail({
            url: '/job/details',
            method: 'post',
            data: {
                jobRole: recruiteDeveloperDetail.jobRole,
                description: recruiteDeveloperDetail.description,
                skills: selectedSkillSets.skills.map((data) => data.id).join(','),
                hourlyRate: recruiteDeveloperDetail.hourlyRate,
            },
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        GetSkillList({
            url: '/search/skill/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleAddSkill = (event) => {
        setSelectedSkillSets({ ...selectedSkillSets, skills: [...selectedSkillSets.skills, event] });
    }
    const handleDeleteSkill = (chipToDelete) => () => {
        setSelectedSkillSets((prevState) => ({
            ...prevState,
            skills: prevState.skills.filter((skill) => skill.id !== chipToDelete.id),
        }));
    };
    return (
        <>
            <Box className='main_section'>
                <Typography variant="span" className='main_section_heading'>Discover Your Dream Developer</Typography>
                <Typography variant="span" className='main_section_description'>Find the perfect match for your company's technical needs with our advanced recruitment platform. Enter the job role,description, education requirements, hourly rate, and desired skills to connect with skilled developers.</Typography>
                <Box className="company_detail_section">
                    <Box className="company_detail_fields">
                        <Box sx={{ width: "45%" }}>
                            <TextField
                                className="company_detail_input_fields"
                                label="Job Role"
                                value={recruiteDeveloperDetail?.jobRole}
                                onChange={e => {
                                    setRecruiteDeveloperDetail({ ...recruiteDeveloperDetail, jobRole: e.target.value })
                                }}
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ width: "45%" }}>
                            <TextField
                                className="company_detail_input_fields"
                                label="Hourly Rate(USD)"
                                type="number"
                                value={recruiteDeveloperDetail?.hourlyRate}
                                onChange={e => {
                                    setRecruiteDeveloperDetail({ ...recruiteDeveloperDetail, hourlyRate: parseInt(e.target.value) })
                                }}
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                    <Box className="company_detail_fields">
                        <Box sx={{ width: "45%" }}>
                            <TextField
                                className="company_detail_input_fields"
                                label="Description"
                                multiline
                                rows={3}
                                value={recruiteDeveloperDetail?.description}
                                onChange={e => {
                                    setRecruiteDeveloperDetail({ ...recruiteDeveloperDetail, description: e.target.value })
                                }}
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ width: "45%" }}>
                            <TextField
                                label="Enter Skill here"
                                variant="outlined"
                                onChange={() => {
                                    let data = selectedSkillSets.skills.map((chip) => (chip.id))
                                    setRecruiteDeveloperDetail({ ...recruiteDeveloperDetail, skills: data })
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <div>
                                            {selectedSkillSets.skills.length > 0 && selectedSkillSets.skills.map((chip) => (
                                                <Chip
                                                    key={chip.id}
                                                    label={chip.name}
                                                    onDelete={handleDeleteSkill(chip)}
                                                />
                                            ))}
                                        </div>
                                    ),
                                }}
                            />
                            <Box>
                                {serviceSkillList.skillList.map((chip) => (
                                    <Chip
                                        variant="outlined"
                                        color="success"
                                        key={chip.id}
                                        deleteIcon={<DoneIcon />}
                                        label={chip.name}
                                        onClick={() => { handleAddSkill(chip) }}
                                        style={{ margin: '4px' }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Button variant="contained" onClick={handleAddRecruiteDeveloperDetail}>Next</Button>
                </Box>
            </Box >
        </>
    )
}

export default RecruiteDeveloperDetail