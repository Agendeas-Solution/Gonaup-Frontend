import React, { useContext, useEffect, useState } from 'react'
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
import RectangularChip from '../RectangularChip/RectangularChip';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
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
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const handleBackPage = () => {
        navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
            - 1].path)
        localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus')) - 1)
    }
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
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
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
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
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
        onSuccess: (res) => {
            navigate(PERMISSION.DEVELOPER_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
                + 1].path)
            localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus'))
                + 1)
            setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.data.message,
            })
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
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
                        label="Search for a Services"
                        variant="outlined"
                        className='skill_detail_textfield'
                        InputProps={{
                            startAdornment: (
                                <div>
                                    {selectedSkillSets.services.length > 0 && selectedSkillSets.services.map((chip) => (
                                        <RectangularChip
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
                            <RectangularChip
                                key={chip.id}
                                deleteIcon={< DoneIcon />}
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
                        label="Enter Skill here"
                        variant="outlined"
                        className='skill_detail_textfield'
                        InputProps={{
                            startAdornment: (
                                <div>
                                    {selectedSkillSets.skills.length > 0 && selectedSkillSets.skills.map((chip) => (
                                        <RectangularChip
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
                            <RectangularChip
                                key={chip.id}
                                deleteIcon={< DoneIcon />}
                                label={chip.name}
                                onClick={() => { handleAddSkill(chip) }}
                                style={{ margin: '4px' }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={10} />
                <Box className="d-flex justify-content-between mt-2 p-1">
                    <Button
                        onClick={handleBackPage}
                        className="back_button">
                        Back
                    </Button>
                    <Button
                        onClick={handleAddServiceDetail}
                        className="save_button">
                        Next
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default SkillDetail
