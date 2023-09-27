import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import './index.css'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { PROJECT } from '../../constants/projectConstant';
import DeleteProjectDialog from '../DeleteProjectDialog/DeleteProjectDialog';
import ProjectDetailRightSection from './ProjectDetailRightSection';
import RectangularChip from '../RectangularChip/RectangularChip';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
const ClientProjectDetails = () => {
    const { id } = useParams();
    const [projectDetail, setProjectDetail] = useState({});
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const [deleteProjectDialogControl, setDeleteProjectDialogControl] = useState({
        status: false,
        reason: "",
        projectId: projectDetail?.id
    })
    const navigate = useNavigate();
    const { mutate: GetProjectList } = useMutation(request, {
        onSuccess: (res) => {
            setProjectDetail(res.data.data);
        },
        onError: (err) => {
            console.log(err);
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleGetProjectDetail = () => {
        GetProjectList({
            url: `/project/details/freelancer?projectId=${id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetProjectDetail();
    }, [])
    const handleClose = () => {
        setDeleteProjectDialogControl({ ...deleteProjectDialogControl, status: false })
    }
    const { mutate: DeleteProject } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
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
    const handleDeleteProject = (id) => {
        DeleteProject({
            url: `/project/close`,
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                reason: deleteProjectDialogControl.reason,
                projectId: id
            }
        })
    }
    return (
        <>
            <Box className="client_project_main_section">
                <Box className="client_project_detail_left_section">
                    <Box className="client_project_title_desc">
                        <Typography className="client_main_heading" variant="span">{projectDetail.title}</Typography>
                        <Typography className='description' variant="span">{projectDetail.description}</Typography>
                    </Box>
                    <Divider sx={{ borderColor: "#E5E5E5" }} className="mt-3" />
                    <Box className="client_project_title_desc mx-1">
                        <Box className="project_detail">
                            <Box className="project_detail_component">
                                <AccessTimeRoundedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading'>
                                        {PROJECT.HOUR_PER_WEEK.map((data) => {
                                            if (data.id === projectDetail.hour_per_week) {
                                                return data.type
                                            }
                                        })}
                                        <Typography className='project_detail_sub_heading mb-4'>Hourly</Typography>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="project_detail_component">
                                <CalendarMonthRoundedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading '>
                                        {PROJECT.PROJECT_DURATION.map((data) => {
                                            if (data.id === projectDetail.project_duration) {
                                                return data.type
                                            }
                                        })}
                                        <Typography className='project_detail_sub_heading'>Project Length</Typography>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="project_detail_component">
                                <SellOutlinedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading'>
                                        {
                                            projectDetail.budget_type === 0 ?
                                                projectDetail.fixed_budget : "$" + projectDetail.min_hourly_budget + " to " + projectDetail.max_hourly_budget + "/hr"
                                        }
                                        <Typography className='project_detail_sub_heading'>
                                            Budget
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="project_detail_component">
                                <EmojiObjectsOutlinedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading' >
                                        {PROJECT.EXPERIENCE_LEVEL.map((data) => {
                                            if (data.id === projectDetail.experience_needed) {
                                                return data.type
                                            }
                                        })}
                                        <Typography className='project_detail_sub_heading'>Comprehensive and deep expertise in this field</Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ borderColor: "#E5E5E5" }} className="mt-3" />
                    <Box className="p-3 d-flex column">
                        <Typography variant='span' className='w-50'>
                            <Typography variant="span" className='project_detail_heading client_project_type'> Project Type: </Typography>
                            {PROJECT.PROJECT_STATUS.map((data) => {
                                if (data.id === projectDetail.project_status) {
                                    return data.type
                                }
                            })}
                        </Typography>
                        <Typography variant='span' className='w-50 ms-4'>
                            <Typography variant="span" className='project_detail_heading'> Job Opportunity: </Typography>
                            {PROJECT.PROJECT_TYPE.map((data) => {
                                if (data.id === projectDetail.project_type) {
                                    return data.type
                                }
                            })}
                        </Typography>
                    </Box>
                    <Divider sx={{ borderColor: "#E5E5E5" }} />
                    <Box className="client_project_title_desc mx-1">
                        <Typography className="project_detail_heading mt-1" variant="span"> Skills and Expertise </Typography>
                        <Stack className="mt-1" direction="row" spacing={1}>
                            {projectDetail.skills && projectDetail.skills.map((data) => {
                                return <RectangularChip label={data.name} />
                            })}
                        </Stack>
                    </Box>
                    <Divider sx={{ borderColor: "#E5E5E5" }} className="mt-3" />
                    {projectDetail?.suggestedTalents && (localStorage.getItem('type') == 1 || localStorage.getItem('type') == 2) && <Box className="client_project_title_desc">
                        <Typography className="project_detail_heading" variant="span"> Suggested  Talent</Typography>
                        <Stack direction="row" spacing={1}>
                            {projectDetail?.suggestedTalents && projectDetail?.suggestedTalents.map((data) => {
                                return <RectangularChip label={data?.name
                                } />
                            })}
                        </Stack>
                    </Box>}
                </Box >
                <Box className="project_detail_right_section">
                    <ProjectDetailRightSection projectDetail={projectDetail} setDeleteProjectDialogControl={setDeleteProjectDialogControl} deleteProjectDialogControl={deleteProjectDialogControl}
                    />
                </Box>
                <DeleteProjectDialog deleteProjectDialogControl={deleteProjectDialogControl} handleClose={handleClose} setDeleteProjectDialogControl={setDeleteProjectDialogControl} handleDeleteProject={handleDeleteProject} />
            </Box >
        </>
    )
}

export default ClientProjectDetails