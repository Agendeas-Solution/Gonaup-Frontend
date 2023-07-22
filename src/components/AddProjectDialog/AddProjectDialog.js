import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import DoneIcon from '@mui/icons-material/Done';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { RMIUploader } from "react-multiple-image-uploader";
import Cookie from 'js-cookie';
const AddProjectDialog = ({ addProjectDialogStatus, setAddProjectDialogStatus, handleDialogClose }) => {
    const [selectedSkillSets, setSelectedSkillSets] = useState({
        services: [],
        skills: []
    });
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    useEffect(() => {
        const newImageURLs = images.map((image) => URL.createObjectURL(image));
        setImageURLs(newImageURLs);
        return () => {
            newImageURLs.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);
    function onImageChange(e) {
        const files = Array.from(e.target.files);
        setImages(files);
        debugger;
    }
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
    const { mutate: AddProject } = useMutation(request, {
        onSuccess: (res) => {
            debugger;
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleSaveProject = () => {
        const formData = new FormData()
        formData.append('title', addProjectDialogStatus.title)
        formData.append('projectUrl', addProjectDialogStatus.projectUrl)
        formData.append('skills', selectedSkillSets.skills.map((data) => data.id).join(","))
        formData.append('dateFrom', addProjectDialogStatus.dateFrom)
        formData.append('dateTo', addProjectDialogStatus.dateTo)
        formData.append('description', addProjectDialogStatus.description)
        for (let i = 0; i < images.length; i++) {
            formData.append('portfolio_image', images[i])
        }
        AddProject({
            url: '/user/freelancer/project',
            method: 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: formData
        })
    }
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
                open={addProjectDialogStatus.status}
                onClose={handleDialogClose}
                sx={{ width: "75%", maxWidth: "auto", margin: "0 auto" }}
            >
                <DialogTitle>
                    Add Project
                </DialogTitle>
                <DialogContent>
                    <input type="file" multiple accept="image/*" onChange={onImageChange} />
                    {imageURLs.map((imageSrc, index) => (
                        <img key={index} src={imageSrc} alt="not found" width={"250px"} />
                    ))}
                    <Box>
                        <Box className='_add_project_textfield_row'>
                            <Box className="add_project_textfield">
                                <TextField
                                    value={addProjectDialogStatus.title}
                                    onChange={(e) => {
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, title: e.target.value })
                                    }}
                                    label="Project Title"
                                    variant="outlined"
                                />
                            </Box>
                            <Box className="add_project_textfield">
                                <TextField
                                    value={addProjectDialogStatus.projectUrl}
                                    onChange={(e) => {
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, projectUrl: e.target.value })
                                    }}
                                    label="Project link"
                                    variant="outlined" />
                            </Box>
                        </Box>
                        <Box className='_add_project_textfield_row'>
                            <Box className="add_project_textfield">
                                <TextField label="Project Description"
                                    multiline
                                    value={addProjectDialogStatus.description}
                                    onChange={(e) => {
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, description: e.target.value })
                                    }}
                                    rows={4}
                                    variant="outlined"
                                />
                            </Box>
                            <Box className="add_project_textfield">
                                <TextField
                                    label="Enter Skill here"
                                    variant="outlined"
                                    onChange={() => {
                                        let data = selectedSkillSets.skills.map((chip) => (chip.id))
                                        debugger;
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, skills: data })
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <div>
                                                {selectedSkillSets.skills.length > 0 && selectedSkillSets.skills.map((chip) => (
                                                    <Chip
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
                                        <Chip
                                            variant="outlined"
                                            color="success"
                                            key={chip.id}
                                            deleteIcon={<DoneIcon />}
                                            label={chip.name}
                                            onClick={() => { handleAddSkill(chip) }}
                                            style={{ margin: '4px' }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                        <Box className='_add_project_textfield_row'>
                            <Box className="add_project_textfield">
                                <Typography variant='span'>Duration</Typography>
                                <Box className="_add_project_textfield_row">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="From"
                                            placeholder="From"
                                            value={addProjectDialogStatus.dateFrom}
                                            onChange={(e) => {
                                                setAddProjectDialogStatus({ ...addProjectDialogStatus, dateFrom: e })
                                            }}
                                            renderInput={(params) => <TextField  {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="To"
                                            placeholder="To"
                                            value={addProjectDialogStatus.dateTo}
                                            onChange={(e) => {
                                                setAddProjectDialogStatus({ ...addProjectDialogStatus, dateTo: e })
                                            }}
                                            renderInput={(params) => <TextField  {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button className="save_button" onClick={handleSaveProject}>Save</Button>
                    <Button className="cancel_button" onClick={handleDialogClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddProjectDialog