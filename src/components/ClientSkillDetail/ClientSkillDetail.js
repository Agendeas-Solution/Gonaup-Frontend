import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Box, InputLabel, TextField, Typography, Chip, Button } from '@mui/material'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import DoneIcon from '@mui/icons-material/Done';
// import './index.css';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#7AC144',
            darker: '#ddd',
        },
    },
});
const ClientSkillDetail = () => {
    const [selectedSkillSets, setSelectedSkillSets] = useState({
        services: [],
        skills: []
    });
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const { mutate: GetServiceList } = useMutation(request, {
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
        GetServiceList({
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

    //Add Skill and Services
    const { mutate: AddSkillService } = useMutation(request, {
        onSuccess: (res) => {
            debugger;
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleAddSkillService = () => {
        AddSkillService({
            url: '/project/skills',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                skills: selectedSkillSets.skills.map((data) => data.id).join(','),
                serviceId: selectedSkillSets.services.map((data) => data.id).join(','),
                projectId: parseInt(localStorage.getItem('projectId'))
            }
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
                <Typography className="main_section_heading" variant='span'>2/4</Typography>
                <Typography className="main_section_heading" variant='span'>Unveiling the Essential Skills Required to Create Your Project Masterpiece</Typography>
                <Typography className="main_section_description" variant='span'>Discover the essential skills that act as the building blocks of brilliance. Specify the unique talents and expertise you're seeking, and watch as your project comes alive with the perfect blend of skill and ingenuity.</Typography>
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
                    <Typography>Your Services</Typography>
                    <TextField
                        placeholder="Enter Services here"
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
                    <Box>
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
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={20} />
                    <Button onClick={handleAddSkillService} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default ClientSkillDetail
