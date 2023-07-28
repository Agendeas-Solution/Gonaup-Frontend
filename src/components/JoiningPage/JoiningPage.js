import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import './index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const JoiningPage = () => {
    const [join, setJoin] = useState('');
    const navigate = useNavigate();
    return (
        <>
            <Box className="joining_section">
                <Typography className='main_heading' variant='span'>Please tell us who you are?</Typography>
                <FormControl sx={{ width: "100%" }}>
                    <RadioGroup row
                        className='radio_group'
                        value={join}
                        onChange={(event) => {
                            setJoin(event.target.value);
                        }}
                    >
                        <Box className="client_developer_selection_box">
                            <FormControlLabel className='client_developer_radio_label' value="freelancerregister" control={<Radio className="client_developer_radio_button" />} />
                            <Typography>I'm a developer,looking for a project</Typography>
                        </Box>
                        <Box className="client_developer_selection_box">
                            <FormControlLabel className='client_developer_radio_label' value="clientregister" control={<Radio className="client_developer_radio_button" />} />
                            <Typography>I’m a client,like to offer a project</Typography>
                        </Box>
                        <Box className="client_developer_selection_box">
                            <FormControlLabel className='client_developer_radio_label' value="recruiterregister" control={<Radio className="client_developer_radio_button" />} />
                            <Typography>  I’m a recruiter,want to hire a developer</Typography>
                        </Box>
                    </RadioGroup>
                </FormControl>
                <Button
                    className="joining_submit_button"
                    onClick={() => {
                        navigate(`/${join}`)
                    }}
                    type="submit"
                    variant='contained'
                >
                    Submit
                </Button>
                <Typography className='mt-2'>Already have an account? Log In</Typography>
            </Box>
        </>
    )
}

export default JoiningPage