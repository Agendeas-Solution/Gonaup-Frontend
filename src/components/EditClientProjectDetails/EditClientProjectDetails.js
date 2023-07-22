import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import './index.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import EditTitleDialog from '../EditTitleDialog/EditTitleDialog';
import { useState } from 'react';
import EditDescriptionDialog from '../EditTitleDialog/EditDescriptionDialog/EditDescriptionDialog';
import EditBudgetDialog from '../EditBudgetDialog/EditBudgetDialog';
import EditSkillDialog from '../EditSkillDialog/EditSkillDialog';
import EditScopeDialog from '../EditScopeDialog/EditScopeDialog';
const EditClientProjectDetails = () => {
    const [editTitleDialogControl, setEditTitleDialogControl] = useState({
        status: false,
        title: ''
    })
    const [editDescriptionDialogControl, setEditDescriptionDialogControl] = useState({
        status: false, description: ""
    })
    const [editBudgetDialogControl, setEditBudgetDialogControl] = useState({
        status: false, budget: ""
    })
    const [editSkillDialogControl, setEditSkillDialogControl] = useState({
        status: false, skill: []
    })
    const [editScopeDialogControl, setEditScopeDialogControl] = useState({
        status: false,
    })
    const handleClose = () => {
        setEditTitleDialogControl({ ...editTitleDialogControl, status: false });
        setEditDescriptionDialogControl({ ...editDescriptionDialogControl, status: false });
        setEditBudgetDialogControl({ ...editBudgetDialogControl, status: false });
        setEditScopeDialogControl({ ...editScopeDialogControl, status: false });
    }
    return (
        <>
            <Box className="edit_client_project_main_section">
                <Box className="edit_client_project_title_desc">
                    <Typography className="client_main_heading" variant="span">Lorem Ipsum is simply dummy text of the</Typography>
                    <EditIcon onClick={() => { setEditTitleDialogControl({ ...editTitleDialogControl, status: true }) }} className="circular_icon" />
                </Box>
                <Divider />
                <Box className="edit_client_project_title_desc">
                    <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Typography>
                    <EditIcon onClick={() => { setEditDescriptionDialogControl({ ...editDescriptionDialogControl, status: true }) }} className="circular_icon" />
                </Box>
                <Divider className="mt-3" />
                <Box className="edit_client_project_title_desc">
                    <Box className="project_detail">
                        <Box className="edit_project_detail_component">
                            <AccessTimeRoundedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_detail_heading'>More than 30 hrs/week
                                </Typography>
                                <Typography className='project_detail_sub_heading'>Hourly</Typography>
                            </Box>
                        </Box>
                        <Box className="edit_project_detail_component">
                            <CalendarMonthRoundedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_detail_heading'>1 to 3 months </Typography>
                                <Typography className='project_detail_sub_heading'>Project Length</Typography>
                            </Box>
                        </Box>
                        <Box className="edit_project_detail_component">
                            <EmojiObjectsOutlinedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_detail_heading' >Expert </Typography>
                                <Typography className='project_detail_sub_heading'>Comprehensive and deep expertise in this field</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <EditIcon onClick={() => { setEditScopeDialogControl({ ...editScopeDialogControl, status: true }) }} className="circular_icon" />
                </Box>
                <Divider className="mt-3" />
                <Box className=" edit_client_project_title_desc p-3">
                    <Box className="edit_project_detail_component">
                        <SellOutlinedIcon />
                        <Box className="d-flex row">
                            <Typography className='mx-1 project_detail_heading'>$100.00 </Typography>
                            <Typography className='project_detail_sub_heading'>Budget</Typography>
                        </Box>
                    </Box>
                    <EditIcon onClick={() => { setEditBudgetDialogControl({ ...editBudgetDialogControl, status: true }) }} className="circular_icon" />
                </Box>
                <Divider className="mt-3" />
                <Box className="edit_client_project_title_desc">
                    <Box>
                        <Typography className="project_detail_heading" variant="span"> Skills and Expertise </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label="React Js" />
                            <Chip label="Node Js" />
                        </Stack>
                    </Box>
                    <EditIcon onClick={() => { setEditSkillDialogControl({ ...editSkillDialogControl, status: true }) }} className="circular_icon" />
                </Box>
                <Divider className="mt-3" />
            </Box >
            <EditTitleDialog editTitleDialogControl={editTitleDialogControl} setEditTitleDialogControl={setEditTitleDialogControl} handleClose={handleClose} />
            <EditDescriptionDialog editDescriptionDialogControl={editDescriptionDialogControl} setEditDescriptionDialogControl={setEditDescriptionDialogControl} handleClose={handleClose} />
            <EditBudgetDialog editBudgetDialogControl={editBudgetDialogControl} setEditBudgetDialogControl={setEditBudgetDialogControl} handleClose={handleClose} />
            <EditSkillDialog editSkillDialogControl={editSkillDialogControl} setEditSkillDialogControl={setEditSkillDialogControl} handleClose={handleClose} />
            <EditScopeDialog setEditScopeDialogControl={setEditScopeDialogControl} editScopeDialogControl={editScopeDialogControl} handleClose={handleClose} />
        </>
    )
}
export default EditClientProjectDetails