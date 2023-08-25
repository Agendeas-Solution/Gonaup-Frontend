import React, { useState } from 'react';
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

const EditSkillDialog = ({ editSkillDialogControl, setEditSkillDialogControl, handleClose, handleUpdateProjectSkillService }) => {
    const [selectedSkillSets, setSelectedSkillSets] = useState({
        services: [],
        skills: editSkillDialogControl?.skills
    });
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
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
                <DialogContent className="d-flex row">
                    <Typography variant='span'>Search skills or add your own</Typography>
                    <TextField
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
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={() => {
                        handleUpdateProjectSkillService(selectedSkillSets)
                    }}>
                        Save</Button>
                    <Button className="cancel_button" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default EditSkillDialog