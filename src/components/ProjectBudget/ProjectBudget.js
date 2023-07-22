import React, { useState } from 'react'
import Header from '../Header/Header'
import { Box, InputLabel, TextField, Typography, Chip, FormControl, RadioGroup, FormControlLabel, Radio, Divider, Button } from '@mui/material'
import './index.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#7AC144',
            darker: '#ddd',
        },
    },
});
const ProjectBudget = () => {
    const [projectBudgetDetail, setProjectBudgetDetail] = useState({
        type: "0",
        minHourlyRate: "",
        maxHourlyRate: "",
    });

    //Update Password
    const { mutate: UpdateProjectBudget } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateProjectBudget = async () => {
        await UpdateProjectBudget({
            url: '/project/budget',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: projectBudgetDetail.type === "0" ? {
                budgetType: projectBudgetDetail.type,
                minHourlyBudget: projectBudgetDetail.minHourlyBudget,
                maxHourlyBudget: projectBudgetDetail.maxHourlyBudget,
                projectId: parseInt(localStorage.getItem('projectId'))
            } : {
                budgetType: projectBudgetDetail.type,

                projectId: parseInt(localStorage.getItem('projectId'))
            }
        })
    }
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <ThemeProvider theme={theme}>
                        <LinearProgress color="secondary" variant="determinate" {...props} />
                    </ThemeProvider>
                </Box>
            </Box>
        );
    }
    LinearProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };
    return (
        <>
            <Box className="main_section">
                <Typography className="main_section_heading" variant='span'>3/4</Typography>
                <Typography className="main_section_heading" variant='span'>Choose Your Project Type, Budget, and Assemble the Dream Team of Professionals</Typography>
                <Typography className="main_section_description" variant='span'>Define the project type and select the optimal team size for your endeavour, whether it's a fixed-budget project or an hourly rate engagement.</Typography>
                <Box className="mt-4 d-flex flex-column">
                    <FormControl sx={{ width: "100%" }}>
                        <RadioGroup row className='project_radio_group'
                            value={projectBudgetDetail.type}
                            onChange={e => {
                                setProjectBudgetDetail({
                                    ...projectBudgetDetail,
                                    type: e.target.value,
                                })
                            }}
                        >
                            <Box className="project_budget_selection_box">
                                <FormControlLabel className='project_budget_radio_label' value="0" control={<Radio className="project_budget_radio_button" />} />
                                <Typography>Hourly rate</Typography>
                            </Box>
                            <Box className="project_budget_selection_box">
                                <FormControlLabel className='project_budget_radio_label' value="1" control={<Radio className="project_budget_radio_button" />} />
                                <Typography>Project budget</Typography>
                            </Box>
                        </RadioGroup>
                    </FormControl>
                    <Divider className='mt-4 mb-4' />
                    {
                        projectBudgetDetail.type === "budget" && <>
                            <Box>
                                <TextField
                                    placeholder="Maximum project budget(USD)"
                                    type="number"
                                    value={projectBudgetDetail.fixedBudget}
                                    onChange={(e) => {
                                        setProjectBudgetDetail({ ...projectBudgetDetail, fixedBudget: e.target.value })
                                    }}
                                />
                            </Box>
                            <Typography variant='span'>You will have the option to create milestones which divide your project into manageable phases.</Typography>
                        </>
                    }
                    {projectBudgetDetail.type === "hourly" &&
                        <>
                            <Box>
                                <Box className="d-flex column">
                                    <Box className="d-flex row mx-3">
                                        <Typography variant='span'>From</Typography>
                                        <TextField
                                            value={projectBudgetDetail.minHourlyRate}
                                            type="number"
                                            onChange={(e) => {
                                                setProjectBudgetDetail({ ...projectBudgetDetail, minHourlyRate: e.target.value })
                                            }}
                                            placeholder="USD per hour"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box className="d-flex row mx-3">
                                        <Typography variant='span'>To</Typography>
                                        <TextField
                                            type="number"
                                            value={projectBudgetDetail.maxHourlyRate}
                                            onChange={(e) => {
                                                setProjectBudgetDetail({ ...projectBudgetDetail, maxHourlyRate: e.target.value })
                                            }}
                                            placeholder="USD per hour"
                                            variant="outlined"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Typography variant='span'>You have to enter more than $5/hour (USD).</Typography>
                        </>
                    }
                </Box>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={20} />
                    <Button onClick={handleUpdateProjectBudget} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default ProjectBudget
