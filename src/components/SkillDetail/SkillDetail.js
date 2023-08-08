import React, { useEffect, useState } from 'react'
import { Box, InputLabel, TextField, Typography, Chip, Button } from '@mui/material'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import DoneIcon from '@mui/icons-material/Done';
import './index.css';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
const SkillDetail = () => {
    const [selectedSkillSets, setSelectedSkillSets] = useState({
        services: [],
        skills: []
    });
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
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
    const { mutate: GetServicesList } = useMutation(request, {
        onSuccess: (res) => {
            setServiceSkillList((prevState) => ({
                ...prevState,
                serviceList: res.data.data,
            }));
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
    useEffect(() => {
        GetServicesList({
            url: '/search/services/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
        GetSkillList({
            url: '/search/skill/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])

    const { mutate: AddSkillService } = useMutation(request, {
        onSuccess: (response) => {
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
        await AddSkillService({
            url: '/user/freelancer/skill',
            method: 'put',
            data: {
                skills: selectedSkillSets.skills.map((data) => data.id).join(','),
                offerServices: selectedSkillSets.services.map((data) => data.id).join(',')
            },
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const handleAddServices = (event) => {
        setSelectedSkillSets({ ...selectedSkillSets, services: [...selectedSkillSets.services, event] });
    }
    const handleAddSkill = (event) => {
        setSelectedSkillSets({ ...selectedSkillSets, skills: [...selectedSkillSets.skills, event] });
    }
    const handleDeleteService = (chipToDelete) => () => {
        setSelectedSkillSets((prevState) => ({
            ...prevState,
            services: prevState.services.filter((service) => service.id !== chipToDelete.id),
        }));
    };
    const handleDeleteSkill = (chipToDelete) => () => {
        setSelectedSkillSets((prevState) => ({
            ...prevState,
            skills: prevState.skills.filter((skill) => skill.id !== chipToDelete.id),
        }));
    };
    return (
        <>
            <Box className="main_section">
                <Typography className="main_section_heading" variant='span'>5/7</Typography>
                <Typography className="main_section_heading" variant='span'>Showcasing Services and Skills</Typography>
                <Typography className="main_section_description" variant='span'>Highlight your core services and skills to captivate potential projects. What are the key services you offer? Share them on this page to demonstrate your versatility and specialisation.</Typography>
                <Box className="d-flex flex-column">
                    <Typography>What are the main services you offer?</Typography>
                    <TextField
                        placeholder="Search for a Services"
                        variant="outlined"
                        className='skill_detail_textfield'
                        InputProps={{
                            startAdornment: (
                                <div>
                                    {selectedSkillSets.services.length > 0 && selectedSkillSets.services.map((chip) => (
                                        <Chip
                                            key={chip.id}
                                            label={chip.name}
                                            onDelete={handleDeleteService(chip)}
                                        />
                                    ))}
                                </div>
                            ),
                        }}
                    />
                    <Box >
                        {serviceSkillList.serviceList.map((chip) => (
                            <Chip
                                variant="outlined"
                                color="success"
                                key={chip.id}
                                deleteIcon={<DoneIcon />}
                                label={chip.name}
                                onClick={() => { handleAddServices(chip) }}
                                style={{ margin: '4px' }}
                            />
                        ))}
                    </Box>
                </Box>
                <Box className="mt-4 d-flex flex-column">
                    <Typography>Your skills</Typography>
                    <TextField
                        placeholder="Enter Skill here"
                        variant="outlined"
                        className='skill_detail_textfield'
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
                    <Box sx={{ width: '100%' }}>
                        <LinearProgressWithLabel value={10} />
                        <Button onClick={handleAddServiceDetail} className="save_button">Next</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SkillDetail
