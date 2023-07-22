import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css';
import EducationLogo from '../../assets/images/education.svg'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddEducationDialog from '../AddEducationDialog/AddEducationDialog';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import DeleteEducationDialog from '../DeleteEducationDialog/DeleteEducationDialog';
const EducationDetail = () => {
    const [addEducationDialogStatus, setAddEducationDialogStatus] = useState(false)
    const [deleteEducationDialogStatus, setDeleteEducationDialogStatus] = useState({
        status: false,
        id: null
    })
    const [educationDetail, setEducationDetail] = useState({
        school: "",
        degree: "",
        studyIn: "",
        description: "",
        dateFrom: null,
        dateTo: null
    })
    const [educationList, setEducationList] = useState([])
    const { mutate: GetEducationList } = useMutation(request, {
        onSuccess: (res) => {
            // setServiceSkillList((prevState) => ({
            //     ...prevState,
            //     skillList: res.data.data,
            // }));
            setEducationList(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetEducationList({
            url: '/user/freelancer/education/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleClose = () => {
        setAddEducationDialogStatus(false)
    }
    const { mutate: AddFreelancerEducation } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            debugger;
        }
    });
    const handleAddEducationDetail = async () => {
        let educationData = {
            school: educationDetail.school,
            degree: educationDetail.degree,
            studyIn: educationDetail.studyIn,
            description: educationDetail.description,
            dateFrom: educationDetail.dateFrom.year(),
            dateTo: educationDetail.dateTo.year(),
        };
        await AddFreelancerEducation({
            url: '/user/freelancer/education',
            method: 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: educationData,
        })
    }
    const { mutate: DeleteEducation } = useMutation(request, {
        onSuccess: (res) => {
            setDeleteEducationDialogStatus({ ...deleteEducationDialogStatus, status: false })
        },
        onError: (err) => {
            debugger;
        }
    });
    const handleDeleteEducation = async (id) => {
        await DeleteEducation({
            url: '/user/freelancer/education',
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: { educationId: id },
        })
    }
    return (
        <>
            <Box className="main_section">
                <Typography className="main_section_heading" variant='span'>2/7</Typography>
                <Typography className="main_section_heading" variant='span'>Unveiling Academic Excellence and Expertise</Typography>
                <Typography className="main_section_description">Unveiling a wealth of academic excellence and expertise. Explore your educational backgrounds, from prestigious universities and specialised programs, to gain insight into the foundation of your knowledge.</Typography>
                <Box className="d-flex mt-2">
                    <Button className='add_education_button' variant='outlined' onClick={() => {
                        setAddEducationDialogStatus(true)
                    }}>+ Add Education</Button>
                    {educationList.map((data) => {
                        return <Box className="Education_Detail_box">
                            <img className='h-100' src={EducationLogo} alt="" />
                            <Box className="d-flex w-100 row" >
                                <Box className="d-flex w-100 justify-content-between align-items-center">
                                    <Typography variant='subtitle1'>{data.school}</Typography>
                                    <Box>
                                        <Button className="Education_detail_box_button"><EditRoundedIcon /></Button>
                                        <Button className="Education_detail_box_button"><DeleteOutlineRoundedIcon
                                            onClick={() => {
                                                setDeleteEducationDialogStatus({ ...deleteEducationDialogStatus, status: true, id: data.id })
                                                debugger;
                                            }}
                                        />
                                        </Button>
                                    </Box>
                                </Box>
                                <Typography className='developer_main_heading' variant='spam'>{data.degree}</Typography>
                                <Typography className='developer_main_heading' variant='span'>{data.study_in}</Typography>
                                <Typography className="sub_heading" variant='span'>{data.date_from}-{data.date_to}</Typography>
                            </Box>
                        </Box>
                    })}

                </Box>
                <AddEducationDialog addEducationDialogStatus={addEducationDialogStatus}
                    handleClose={handleClose} educationDetail={educationDetail} setEducationDetail={setEducationDetail} handleAddEducationDetail={handleAddEducationDetail} />
                <DeleteEducationDialog deleteEducationDialogStatus={deleteEducationDialogStatus} handleClose={handleClose} handleDeleteEducation={handleDeleteEducation} />
            </Box>
        </>
    )
}

export default EducationDetail