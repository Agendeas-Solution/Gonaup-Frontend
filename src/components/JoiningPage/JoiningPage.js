import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import './index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
const JoiningPage = () => {
    const [join, setJoin] = useState('');
    const navigate = useNavigate();
    return (
        <>
            <HeaderLogo />
            <Box className="d-flex column">
                <Box className="joining_section">
                    <Typography
                        sx={{ textAlign: "start !important" }}
                        className='main_heading'
                        variant='span'>
                        Please tell us who you are?
                    </Typography>
                    <FormControl sx={{ width: "100%" }}>
                        <RadioGroup row
                            className='radio_group'
                            value={join}
                            onChange={(event) => {
                                setJoin(event.target.value);
                            }}
                        >
                            <Box className="client_developer_selection_box">
                                <FormControlLabel
                                    className='client_developer_radio_label'
                                    value="freelancerregister"
                                    control={<Radio className="client_developer_radio_button" />} />
                                <Typography
                                    className="main_section_description"
                                    variant="span">
                                    I'm a developer,
                                    looking for a project
                                </Typography>
                            </Box>
                            <Box className="client_developer_selection_box">
                                <FormControlLabel
                                    className='client_developer_radio_label'
                                    value="clientregister"
                                    control={<Radio className="client_developer_radio_button" />} />
                                <Typography
                                    className="main_section_description"
                                    variant="span">
                                    I’m a client,
                                    like to offer a project
                                </Typography>
                            </Box>
                            <Box className="client_developer_selection_box">
                                <FormControlLabel
                                    className='client_developer_radio_label'
                                    value="recruiterregister"
                                    control={<Radio className="client_developer_radio_button" />} />
                                <Typography
                                    className="main_section_description"
                                    variant="span">
                                    I’m a recruiter,
                                    want to hire a developer
                                </Typography>
                            </Box>
                        </RadioGroup>
                    </FormControl>
                    <Typography
                        className='mt-2 already_account_login'>
                        Already have an account?
                        <Button
                            disableElevation
                            disableFocusRipple
                            disableRipple
                            sx={{ textTransform: "capitalize", color: "#7AC144" }}
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            Log In
                        </Button>
                    </Typography>
                </Box>
                <Box className="joining_page_left_section">
                    <Button
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        disabled={join === "" ? true : false}
                        className={join === "" ? "disable_joining_submit_button" : "joining_submit_button"}
                        onClick={() => {
                            navigate(`/${join}`)
                        }}
                        type="submit"
                        variant='contained'
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default JoiningPage