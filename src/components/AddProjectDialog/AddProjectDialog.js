import React, { useEffect, useState } from 'react'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import './index.css'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import DoneIcon from '@mui/icons-material/Done';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Cookie from 'js-cookie';
import RectangularChip from '../RectangularChip/RectangularChip';
const AddProjectDialog = ({ addProjectDialogStatus, setAddProjectDialogStatus, handleDialogClose, }) => {
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
        if (addProjectDialogStatus?.id) {
            formData.append('projectId', addProjectDialogStatus.id)
        }
        AddProject({
            url: '/user/freelancer/project',
            method: addProjectDialogStatus?.id ? "put" : 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: formData
        })
    }
    const { mutate: GetFreelancerProjectDetails } = useMutation(request, {
        onSuccess: (res) => {
            let projectDetail = res.data.data
            setAddProjectDialogStatus({
                ...addProjectDialogStatus, id: projectDetail.id, title: projectDetail.title,
                description: projectDetail.description,
                projectUrl: projectDetail.project_url,
                dateFrom: projectDetail.date_from,
                dateTo: projectDetail.date_to,
            })
            setSelectedSkillSets({ ...selectedSkillSets, skills: projectDetail.skills })
            setImageURLs(projectDetail.projectImageArray)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        {
            addProjectDialogStatus.id && GetFreelancerProjectDetails({
                url: `/user/freelancer/project?projectId=${addProjectDialogStatus.id}`,
                method: 'get',
                headers: {
                    Authorization: `${Cookie.get('userToken')}`,
                },
            })
        }
    }, [addProjectDialogStatus.id])
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
                <DialogTitle className="dialog_heading">
                    Add Project
                </DialogTitle>
                <DialogContent>
                    <input type="file" className='my-2' multiple accept="image/*" onChange={onImageChange} />
                    {imageURLs.map((imageSrc, index) => (
                        <img key={index} src={imageSrc} alt="not found" width={"250px"} />
                    ))}
                    <Box>
                        <Box className='_add_project_textfield_row'>
                            <Box className="add_project_textfield w-45">
                                <TextField
                                    value={addProjectDialogStatus.title}
                                    onChange={(e) => {
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, title: e.target.value })
                                    }}
                                    label="Project Title"
                                    variant="outlined"
                                    className='my-2'
                                />
                            </Box>
                            <Box className="add_project_textfield w-45">
                                <TextField
                                    value={addProjectDialogStatus.projectUrl}
                                    onChange={(e) => {
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, projectUrl: e.target.value })
                                    }}
                                    label="Project link"
                                    variant="outlined"
                                    className='my-2' />
                            </Box>
                        </Box>
                        <Box className='_add_project_textfield_row'>
                            <Box className="add_project_textfield w-45">
                                <TextField
                                    label="Project Description"
                                    multiline
                                    value={addProjectDialogStatus.description}
                                    onChange={(e) => {
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, description: e.target.value })
                                    }}
                                    rows={4}
                                    variant="outlined"
                                    className='my-2'
                                />
                            </Box>
                            <Box className="add_project_textfield w-45">
                                <TextField
                                    label="Enter Skill here"
                                    variant="outlined"
                                    className='my-2'
                                    onChange={() => {
                                        let data = selectedSkillSets.skills.map((chip) => (chip.id))
                                        setAddProjectDialogStatus({ ...addProjectDialogStatus, skills: data })
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <div>
                                                {selectedSkillSets.skills.length > 0 && selectedSkillSets.skills.map((chip) => (
                                                    <RectangularChip
                                                        key={chip.id}
                                                        label={chip.name}
                                                        onDelete={handleDeleteSkill(chip)}
                                                        className='my-2'
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
                            </Box>
                        </Box>
                        <Box className='_add_project_textfield_row'>
                            <Box className="add_project_textfield w-45  ">
                                <Typography variant='span'>Duration</Typography>
                                <Box className="_add_project_textfield_row">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="From"
                                            className='w-45'
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
                                            className='w-45'
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
                    <Button className="cancel_button px-4 mx-3" onClick={handleDialogClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddProjectDialog