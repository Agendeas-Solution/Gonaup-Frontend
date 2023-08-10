import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import './index.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { useEffect, useState } from 'react';
import EditBudgetDialog from '../EditBudgetDialog/EditBudgetDialog';
import EditSkillDialog from '../EditSkillDialog/EditSkillDialog';
import EditScopeDialog from '../EditScopeDialog/EditScopeDialog';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PROJECT } from '../../constants/projectConstant';
import EditTitleDescriptionDialog from '../EditTitleDialog/EditTitleDescriptionDialog';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
const EditClientProjectDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [editTitleDescriptionDialogControl, setEditTitleDescriptionDialogControl] = useState({
        status: false,
        title: '', description: ""
    })
    const location = useLocation();
    const projectDetail = location.state;
    const [editBudgetDialogControl, setEditBudgetDialogControl] = useState({
        status: false, budget: ""
    })
    const [editSkillDialogControl, setEditSkillDialogControl] = useState({
        status: false, skills: []
    })
    const [editScopeDialogControl, setEditScopeDialogControl] = useState({
        status: false,
    })
    const handleClose = () => {
        setEditTitleDescriptionDialogControl({ ...editTitleDescriptionDialogControl, status: false });
        setEditBudgetDialogControl({ ...editBudgetDialogControl, status: false });
        setEditScopeDialogControl({ ...editScopeDialogControl, status: false });
        setEditSkillDialogControl({ ...editSkillDialogControl, status: false })
    }
    const { mutate: UpdateTitleDescription } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateTitleDescription = () => {
        UpdateTitleDescription({
            url: `/project/title`,
            method: 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                title: editTitleDescriptionDialogControl.title,
                description: editTitleDescriptionDialogControl.description,
                projectId: id
            }
        })
    }
    const { mutate: UpdateBudget } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateBudget = () => {
        UpdateBudget({
            url: `/project/budget`,
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                budgetType: 0,
                fixedBudget: 150,
                projectId: 2
            }
        })
    }
    const { mutate: UpdateProjectRequirement } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateProjectRequirement = () => {
        UpdateProjectRequirement({
            url: `/project/requirements`,
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                experienceNeeded: parseInt(editScopeDialogControl.experienceNeeded),
                projectDuration: parseInt(editScopeDialogControl.projectDuration),
                hourePerWeek: parseInt(editScopeDialogControl.hourePerWeek),
                projectId: projectDetail.id,
                isPublished: true
            }
        })
    }
    const { mutate: UpdateProjectSkillService } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateProjectSkillService = (selectedSkillSets) => {
        UpdateProjectSkillService({
            url: `/project/skills`,
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                skills: selectedSkillSets.skills.map((data) => data.id).join(","),
                serviceId: 1,
                projectId: 3
            }
        })
    }

    return (
        <>
            <Box className="edit_client_project_main_section">
                <Box className="edit_client_project_title_desc">
                    <Typography className="client_main_heading" variant="span">{projectDetail?.title}</Typography>
                    <EditIcon onClick={() => { setEditTitleDescriptionDialogControl({ ...editTitleDescriptionDialogControl, status: true, title: projectDetail.title, description: projectDetail?.description }) }} className="circular_icon" />
                </Box>
                <Box className="edit_client_project_title_desc">
                    <Typography>{projectDetail?.description} </Typography>
                </Box>
                <Divider />
                <Box className="edit_client_project_title_desc">
                    <Box className="project_detail">
                        <Box className="edit_project_detail_component">
                            <AccessTimeRoundedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_detail_heading'> {PROJECT.HOUR_PER_WEEK.map((data) => {
                                    if (data.id === projectDetail.hour_per_week) {
                                        return data.type
                                    }
                                })}
                                </Typography>
                                <Typography className='project_detail_sub_heading'>Hourly</Typography>
                            </Box>
                        </Box>
                        <Box className="edit_project_detail_component">
                            <CalendarMonthRoundedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_detail_heading'> {PROJECT.PROJECT_DURATION.map((data) => {
                                    if (data.id === projectDetail.project_duration) {
                                        return data.type
                                    }
                                })} </Typography>
                                <Typography className='project_detail_sub_heading'>Project Length</Typography>
                            </Box>
                        </Box>
                        <Box className="edit_project_detail_component">
                            <EmojiObjectsOutlinedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_detail_heading' > {PROJECT.EXPERIENCE_LEVEL.map((data) => {
                                    if (data.id === projectDetail.experience_needed) {
                                        return data.type
                                    }
                                })} </Typography>
                                <Typography className='project_detail_sub_heading'>Comprehensive and deep expertise in this field</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <EditIcon onClick={() => {
                        setEditScopeDialogControl({
                            ...editScopeDialogControl, status: true,
                            experienceNeeded: projectDetail.experience_needed,
                            projectDuration: projectDetail.project_duration,
                            hourePerWeek: projectDetail.hour_per_week,
                            projectId: projectDetail.id,
                            isPublished: true
                        })
                    }} className="circular_icon" />
                </Box>
                <Divider className="mt-3" />
                <Box className=" edit_client_project_title_desc p-3">
                    <Box className="edit_project_detail_component">
                        <SellOutlinedIcon />
                        <Box className="d-flex row">
                            <Typography className='mx-1 project_detail_heading'> {
                                projectDetail.budget_type === 0 ?
                                    projectDetail.fixed_budget : " $ " + projectDetail.min_hourly_budget + " to " + projectDetail.max_hourly_budget
                            }</Typography>
                            <Typography className='project_detail_sub_heading'>Budget</Typography>
                        </Box>
                    </Box>
                    <EditIcon onClick={() => { setEditBudgetDialogControl({ ...editBudgetDialogControl, status: true, budget: projectDetail.fixed_budget }) }} className="circular_icon" />
                </Box>
                <Divider className="mt-3" />
                <Box className="edit_client_project_title_desc">
                    <Box>
                        <Typography className="project_detail_heading" variant="span"> Skills and Expertise </Typography>
                        <Stack direction="row" spacing={1}>
                            {projectDetail.skills && projectDetail.skills.map((data) => {
                                return <Chip label={data.name} />
                            })}
                        </Stack>
                    </Box>
                    <EditIcon onClick={() => { setEditSkillDialogControl({ ...editSkillDialogControl, status: true, skills: projectDetail.skills }) }} className="circular_icon" />
                </Box>
                <Divider className="mt-3" />
            </Box >
            <EditTitleDescriptionDialog editTitleDescriptionDialogControl={editTitleDescriptionDialogControl} setEditTitleDescriptionDialogControl={setEditTitleDescriptionDialogControl} handleClose={handleClose} handleUpdateTitleDescription={handleUpdateTitleDescription} />

            <EditBudgetDialog editBudgetDialogControl={editBudgetDialogControl} setEditBudgetDialogControl={setEditBudgetDialogControl} handleClose={handleClose} />

            <EditSkillDialog editSkillDialogControl={editSkillDialogControl} setEditSkillDialogControl={setEditSkillDialogControl} handleClose={handleClose} handleUpdateProjectSkillService={handleUpdateProjectSkillService} />

            <EditScopeDialog setEditScopeDialogControl={setEditScopeDialogControl} handleUpdateProjectRequirement={handleUpdateProjectRequirement} editScopeDialogControl={editScopeDialogControl} handleClose={handleClose} />
        </>
    )
}
export default EditClientProjectDetails