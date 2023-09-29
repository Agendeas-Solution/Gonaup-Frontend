import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import './index.css'
import { Box, Chip, TextField, Typography } from '@mui/material';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import { useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import RectangularChip from '../RectangularChip/RectangularChip';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
const EditSkillDialog = ({ editSkillDialogControl, setEditSkillDialogControl, handleClose, handleUpdateProjectSkillService }) => {
    const [selectedSkillSets, setSelectedSkillSets] = useState({
        services: [],
        skills: editSkillDialogControl?.skills
    });
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
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
            <Dialog
                open={editSkillDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Skill
                </DialogTitle>
                <DialogContent className="d-flex justify-content-center align-item-center row">
                    <Typography className='edit_client_project_title mb-1' variant='span'>Search skills or add your own</Typography>
                    <TextField
                        className='edit_client_project_title mb-3'
                        placeholder="Enter Skill here"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <div>
                                    {selectedSkillSets.skills && selectedSkillSets.skills.map((chip) => (
                                        <RectangularChip
                                            key={chip.id}
                                            label={chip.name}
                                            onDelete={handleDeleteSkill(chip)}
                                            className='my-2 mx-1'
                                        />
                                    ))}
                                </div>
                            ),
                        }}
                    />
                    <Box>
                        {serviceSkillList.skillList.map((chip) => (
                            <RectangularChip
                                className='ms-3'
                                key={chip.id}
                                deleteIcon={< DoneIcon />}
                                label={chip.name}
                                onClick={() => { handleAddSkill(chip) }}
                                style={{ margin: '4px' }}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={() => {
                        handleUpdateProjectSkillService(selectedSkillSets)
                    }}>
                        Save</Button>
                    <Button className="cancel_button edit_client_project_cancel" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default EditSkillDialog