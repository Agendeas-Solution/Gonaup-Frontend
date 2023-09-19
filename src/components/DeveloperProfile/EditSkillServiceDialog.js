import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import DoneIcon from '@mui/icons-material/Done';
import Cookie from 'js-cookie';
import RectangularChip from '../RectangularChip/RectangularChip';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'

const EditSkillServiceDialog = ({ handleClose, editSkillDialogControl, setEditSkillDialogControl, handleEditSkillDialog }) => {
    const [selectedSkillSets, setSelectedSkillSets] = useState({
        services: editSkillDialogControl?.services,
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
    useEffect(() => {
        GetSkillList({
            url: '/search/skill/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
        GetServicesList({
            url: '/search/services/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])

    const handleAddServices = (event) => {
        setSelectedSkillSets({ ...selectedSkillSets, services: [...selectedSkillSets.services, event] });
    }
    const handleDeleteService = (chipToDelete) => () => {
        setSelectedSkillSets((prevState) => ({
            ...prevState,
            services: prevState.services.filter((service) => service.id !== chipToDelete.id),
        }));
    };
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
                <DialogContent>
                    <Box className="add_project_textfield">
                        <TextField
                            className="my-3 w-100"
                            label="Enter Skill here"
                            variant="outlined"
                            onChange={() => {
                                let data = selectedSkillSets.skills.map((chip) => (chip.id))
                                setEditSkillDialogControl({ ...editSkillDialogControl, skills: data })
                            }}
                            InputProps={{
                                startAdornment: (
                                    <div>
                                        {selectedSkillSets.skills && selectedSkillSets.skills.map((chip) => (
                                            <RectangularChip
                                                key={chip.id}
                                                label={chip.name}
                                                onDelete={handleDeleteSkill(chip)}
                                                className='my-3 mx-2'
                                            />
                                        ))}
                                    </div>
                                ),
                            }}
                        />
                        <Box>
                            {selectedSkillSets.skills.length > 0 ? serviceSkillList.skillList.map((chip) => (
                                selectedSkillSets.skills.map((selectedChip) => (
                                    selectedChip.id !== chip.id ? (<RectangularChip
                                        key={chip.id}
                                        deleteIcon={<DoneIcon />}
                                        label={chip.name}
                                        onClick={() => { handleAddSkill(chip) }}
                                        style={{ margin: '4px' }}
                                    />
                                    ) : null
                                ))
                            )) :
                                serviceSkillList.skillList.map((chip) => (
                                    <RectangularChip
                                        key={chip.id}
                                        deleteIcon={< DoneIcon />}
                                        label={chip.name}
                                        onClick={() => { handleAddSkill(chip) }}
                                        style={{ margin: '4px' }}
                                    />
                                ))
                            }
                        </Box>
                        <TextField
                            label="Enter Services here"
                            variant="outlined"
                            className='skill_detail_textfield my-3 w-100'
                            InputProps={{
                                startAdornment: (
                                    <div>
                                        {selectedSkillSets.services.length > 0 && selectedSkillSets.services.map((chip) => (
                                            <RectangularChip
                                                key={chip.id}
                                                label={chip.name}
                                                onDelete={handleDeleteService(chip)}
                                                className='my-3 mx-2'
                                            />
                                        ))}
                                    </div>
                                ),
                            }}
                        />
                        <Box>
                            {selectedSkillSets.services.length > 0 ? serviceSkillList.serviceList.map((chip) => (
                                selectedSkillSets.services.map((selectedChip) => (
                                    selectedChip.id !== chip.id ? (<RectangularChip
                                        key={chip.id}
                                        deleteIcon={<DoneIcon />}
                                        label={chip.name}
                                        onClick={() => { handleAddServices(chip) }}
                                        style={{ margin: '4px' }}
                                    />
                                    ) : null
                                ))
                            )) :
                                serviceSkillList.serviceList.map((chip) => (
                                    <RectangularChip
                                        key={chip.id}
                                        deleteIcon={< DoneIcon />}
                                        label={chip.name}
                                        onClick={() => { handleAddServices(chip) }}
                                        style={{ margin: '4px' }}
                                    />
                                ))
                            }
                            {/* {serviceSkillList.serviceList.map((chip) => (
                                serviceSkillList.serviceList.map((chip) => (
                                    <RectangularChip
                                        key={chip.id}
                                        deleteIcon={< DoneIcon />}
                                        label={chip.name}
                                        onClick={() => { handleAddServices(chip) }}
                                        style={{ margin: '4px' }}
                                    />
                                )
                                ))} */}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={
                        () => handleEditSkillDialog(selectedSkillSets)} >Save</Button>
                    <Button className="cancel_button px-4 mx-3" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditSkillServiceDialog