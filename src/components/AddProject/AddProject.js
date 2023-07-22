import React, { useContext, useState } from 'react'
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, Radio, Autocomplete, createFilterOptions } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
// import Logo from '../../assets/img/Gonaup Logo.svg'
import { REGISTER } from '../../constants/registerConstant'
import './index.css'
import { useMutation } from 'react-query'
import { request } from '../../utils/axios-utils'
const AddProject = () => {
    const [addProject, setAddProject] = useState({
        title: '',
        project_duration: null,
        fixedBudget: null,
        hourlyBudget: null,
        skills: null,
        englishLevel: null,
        type: null,
        hourlyRate: null,
    })
    const { mutate } = useMutation(request);
    const handleAddProject = async (e) => {
        await mutate({
            url: '/project',
            method: 'post',
            data: addProject,
            onSuccess: (response, variables) => {
                console.log(variables);
            },
            onError: (response) => {
                console.log(response);
            }
        })
    };
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option?.name,
    })
    return (
        <>
            <Box className="register_section">
                <Box className="register_right_section">
                    <Box className="register_main_section">
                        <Box className="register_main_section">
                            <Box className="register_page_fields">
                                <TextField
                                    className="register_input_fields"
                                    label="Title"
                                    placeholder="Title"
                                    value={addProject?.title}
                                    onChange={e => {
                                        setAddProject({ ...addProject, title: e.target.value })
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                            <Box className="register_page_fields">
                                <TextField
                                    className="register_input_fields"
                                    label="Description"
                                    placeholder="Description"
                                    value={addProject?.description}
                                    onChange={e => {
                                        setAddProject({ ...addProject, description: e.target.value })
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                            <Box className="register_page_fields">
                                <FormControl>
                                    <FormLabel>Type</FormLabel>
                                    <RadioGroup
                                        row
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value='0' control={<Radio />} label="Fixed" />
                                        <FormControlLabel value="1" control={<Radio />} label="Hourly" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box className="register_page_fields">
                                <TextField
                                    className="register_input_fields"
                                    label="Fixed Budget "
                                    type="number"
                                    placeholder="Fixed Budget"
                                    value={addProject?.fixedBudget}
                                    onChange={e => {
                                        setAddProject({ ...addProject, fixedBudget: e.target.value })
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    className="register_input_fields"
                                    label="Skills"
                                    type={'text'}
                                    value={addProject?.skills}
                                    onChange={e => {
                                        setAddProject({ ...addProject, skills: e.target.value })
                                    }}
                                />
                            </Box>
                            <Box className="register_page_fields">
                                <TextField
                                    className="register_input_fields"
                                    label="Hourly Rate"
                                    placeholder="Hourly Rate"
                                    value={addProject?.hourlyRate}
                                    onChange={e => {
                                        setAddProject({ ...addProject, hourlyRate: e.target.value })
                                    }}
                                    variant="outlined"
                                />
                                <FormControl>
                                    <InputLabel>Select English Level</InputLabel>
                                    <Select
                                        className="register_input_fields"
                                        label="Select English Level"
                                        value={addProject?.englishLevel}
                                        onChange={e => {
                                            setAddProject({ ...addProject, englishLevel: e.target.value })
                                        }}
                                    >
                                        {REGISTER.ENGLISH_LEVEL.map(data => {
                                            return <MenuItem value={data?.id}>{data?.type}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Select English Level</InputLabel>
                                    <Select
                                        className="register_input_fields"
                                        label="Select English Level"
                                        value={addProject?.project_duration}
                                        onChange={e => {
                                            setAddProject({ ...addProject, project_duration: e.target.value })
                                        }}
                                    >
                                        {REGISTER.ENGLISH_LEVEL.map(data => {
                                            return <MenuItem value={data?.id}>{data?.type}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                sx={{ width: '30%' }}
                                onClick={handleAddProject}
                                variant="contained"
                                className={'register_button'}
                            >
                                Add Project
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AddProject
