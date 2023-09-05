import React, { useEffect, useState } from 'react'
import { Box, Button, LinearProgress, ThemeProvider, Typography, createTheme } from '@mui/material'
import './index.css';
import EducationLogo from '../../assets/images/education.svg'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddExperienceDialog from '../AddExperienceDialog/AddExperienceDialog';
import DeleteExperienceDialog from '../DeleteExperienceDialog/DeleteExperienceDialog';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleNextDeveloper } from '../../hooks/storage';
import { PERMISSION } from '../../constants/permissionConstant';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#0971f1',
            darker: '#053e85',
        },
    },
});
const ExperienceDetail = () => {
    const [addExperienceDialogStatus, setAddExperienceDialogStatus] = useState(false);
    const [deleteExperienceDialogStatus, setDeleteExperienceDialogStatus] = useState({
        status: false, id: null
    })
    const navigate = useNavigate()
    const [experienceDetail, setExperienceDetail] = useState({
        title: null,
        company: null,
        countryId: null,
        countryName: null,
        countryCode: null,
        isWorking: false,
        cityName: null,
        workingFrom: null,
        workgingTo: null,
        description: null
    });
    const [experienceList, setExperienceList] = useState([])
    const handleClose = () => {
        setAddExperienceDialogStatus(false);
        setDeleteExperienceDialogStatus(false);
    };
    const { mutate: GetExperienceList } = useMutation(request, {
        onSuccess: (res) => {
            setExperienceList(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetExperienceList({
            url: '/user/freelancer/experience/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleBackPage = () => {
        navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
            - 1].path)
        localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus')) - 1)
    }
    const { mutate: AddFreelancerExperience } = useMutation(request, {
        onSuccess: (res) => {
            setAddExperienceDialogStatus(false)

        },
        onError: (err) => {
            ;
        }
    });
    const { mutate: DeleteExperience } = useMutation(request, {
        onSuccess: (res) => {
            setDeleteExperienceDialogStatus({ ...deleteExperienceDialogStatus, status: false })
        },
        onError: (err) => {
        }
    });
    const handleDeleteExperience = async (id) => {
        await DeleteExperience({
            url: '/user/freelancer/experience',
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: { experienceId: id },
        })
    }
    const handleAddExperience = async () => {
        let data = {
            title: experienceDetail.title,
            company: experienceDetail.company,
            countryId: experienceDetail.country.id,
            countryName: experienceDetail.country.name,
            countryCode: experienceDetail.country.iso2,
            isWorking: experienceDetail.isWorking,
            cityName: experienceDetail.cityName,
            workingFrom: experienceDetail.workingFrom,
            workgingTo: experienceDetail.workgingTo,
            description: experienceDetail.description
        }
        await AddFreelancerExperience({
            url: '/user/freelancer/experience',
            method: 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: data,
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
                <Typography className="main_section_heading" variant='span'>3/7</Typography>
                <Typography className="main_section_heading" variant='span'>Unveiling Academic Excellence and Expertise</Typography>
                <Typography className="main_section_description" variant='span'>Unveiling a wealth of academic excellence and expertise. Explore your educational backgrounds, from prestigious universities and specialised programs, to gain insight into the foundation of your knowledge.</Typography>
                <Box className="d-flex">
                    <Button className='add_experience_button' variant='outlined' onClick={() => {
                        setAddExperienceDialogStatus(true);
                    }}>+ Add Experience</Button>
                    {experienceList.map((data) => {
                        return <Box className="experience_Detail_box">
                            <img src={EducationLogo} alt="" />
                            <Box>
                                <Box className="d-flex justify-content-between align-items-center">
                                    <Box className="d-flex row">
                                        <Typography className='developer_main_heading' variant='span'>{data.title}</Typography>
                                        <Typography className='developer_main_heading' variant='span'>{data.company}</Typography>
                                    </Box>
                                    <Box>
                                        <Button className="Education_detail_box_button"><EditRoundedIcon
                                            onClick={() => {
                                                setAddExperienceDialogStatus(true);
                                                setExperienceDetail({
                                                    ...experienceDetail,
                                                    id: data.id,
                                                    title: data.title,
                                                    company: data.company,
                                                    country: { name: data.country_name, id: data.country_id },
                                                    isWorking: data.isWorking,
                                                    cityName: data.city_name,
                                                    workingFrom: data.working_from,
                                                    workgingTo: data.working_to,
                                                    description: data.description
                                                })
                                            }}
                                        /></Button>
                                        <Button className="Education_detail_box_button"
                                            onClick={() => {
                                                setDeleteExperienceDialogStatus({ ...deleteExperienceDialogStatus, status: true, id: data.id })
                                            }}
                                        ><DeleteOutlineRoundedIcon />
                                        </Button>
                                    </Box>
                                </Box>
                                <Typography variant='subtitle2'>{data.working_from} - {data.working_to}</Typography>
                                <Typography sx={{ color: "#8E8E8E" }}>{data.city_name},{data.country_name}</Typography>
                            </Box>
                        </Box>
                    })}
                </Box>
                <AddExperienceDialog experienceDetail={experienceDetail} setExperienceDetail={setExperienceDetail} addExperienceDialogStatus={addExperienceDialogStatus} handleClose={handleClose} handleAddExperience={handleAddExperience} />
                <DeleteExperienceDialog
                    deleteExperienceDialogStatus={deleteExperienceDialogStatus}
                    handleClose={handleClose} handleDeleteExperience={handleDeleteExperience}
                />
            </Box >
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={10} />
                <Box className="d-flex justify-content-between mt-2 p-1">
                    <Button onClick={handleBackPage} className="back_button">Back</Button>
                    <Button onClick={() => handleNextDeveloper(navigate)} className="save_button">Next</Button>
                </Box>
            </Box>
        </ >
    )
}

export default ExperienceDetail