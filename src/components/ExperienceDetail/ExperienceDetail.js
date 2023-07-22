import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css';
import EducationLogo from '../../assets/images/education.svg'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddExperienceDialog from '../AddExperienceDialog/AddExperienceDialog';
import DeleteExperienceDialog from '../DeleteExperienceDialog/DeleteExperienceDialog';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
const ExperienceDetail = () => {
    const [addExperienceDialogStatus, setAddExperienceDialogStatus] = useState(false);
    const handleClose = () => {
        setAddExperienceDialogStatus(false);
        setDeleteExperienceDialogStatus(false);
    };
    const [deleteExperienceDialogStatus, setDeleteExperienceDialogStatus] = useState({
        status: false, id: null
    })
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
    const { mutate: GetExperienceList } = useMutation(request, {
        onSuccess: (res) => {
            // setServiceSkillList((prevState) => ({
            //     ...prevState,
            //     skillList: res.data.data,
            // }));
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
    const { mutate: AddFreelancerExperience } = useMutation(request, {
        onSuccess: (res) => {
            setAddExperienceDialogStatus(false)
        },
        onError: (err) => {
            debugger;
        }
    });
    const { mutate: DeleteExperience } = useMutation(request, {
        onSuccess: (res) => {
            setDeleteExperienceDialogStatus({ ...deleteExperienceDialogStatus, status: false })
        },
        onError: (err) => {
            debugger;
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
                                        /></Button>
                                        <Button className="Education_detail_box_button"
                                            onClick={() => {
                                                setDeleteExperienceDialogStatus({ ...deleteExperienceDialogStatus, status: true, id: data.id })
                                                debugger;
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
        </ >
    )
}

export default ExperienceDetail