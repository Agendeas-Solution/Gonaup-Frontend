import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import { Box, InputLabel, TextField, Typography, Chip, FormControl, RadioGroup, FormControlLabel, Radio, Divider, Button } from '@mui/material'
import './index.css';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { PERMISSION } from '../../constants/permissionConstant';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'

import { useNavigate } from 'react-router-dom';
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
        minHourlyRate: null,
        maxHourlyRate: null,
        fixedBudget: null
    });
    const navigate = useNavigate();
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const handleBackPage = () => {
        navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
            - 1].path)
        localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus')) - 1)
    }
    //Update Password
    const { mutate: UpdateProjectBudget } = useMutation(request, {
        onSuccess: (res) => {
            navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[parseInt(localStorage.getItem('stepStatus'))
                + 1].path)
            localStorage.setItem('stepStatus', parseInt(localStorage.getItem('stepStatus'))
                + 1)
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
    const handleUpdateProjectBudget = async () => {
        await UpdateProjectBudget({
            url: '/project/budget',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: projectBudgetDetail.type === "0" ? {
                budgetType: projectBudgetDetail.type,
                minHourlyBudget: projectBudgetDetail.minHourlyRate,
                maxHourlyBudget: projectBudgetDetail.maxHourlyRate,
                projectId: parseInt(localStorage.getItem('projectId'))
            } : {
                budgetType: projectBudgetDetail.type,
                projectId: parseInt(localStorage.getItem('projectId')),
                fixedBudget: projectBudgetDetail.fixedBudget
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
                    {projectBudgetDetail.type === "0" &&
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
                                            label="USD per hour"
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
                                            label="USD per hour"
                                            variant="outlined"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Typography variant='span'>You have to enter more than $5/hour (USD).</Typography>
                        </>
                    }
                    {
                        projectBudgetDetail.type === "1" && <>
                            <Box>
                                <TextField
                                    label="Maximum project budget(USD)"
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
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={10} />
                <Box className="d-flex justify-content-between mt-2 p-1">
                    <Button onClick={handleBackPage} className="back_button">Back</Button>
                    <Button onClick={handleUpdateProjectBudget} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default ProjectBudget
