import React from 'react'
import './index.css'
import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
const EditClientProfile = () => {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <Box className="edit_client_profile_main_section p-4">
                <Typography className='edit_profile_section_heading' variant='span'>Account</Typography>
                <Box className="d-flex justify-content-between column">
                    <Box sx={{ width: "15%" }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </Box>
                    <Box sx={{ width: "85%" }} className="d-flex justify-content-between row">
                        <Box className="d-flex justify-content-between row">
                            <TextField
                                variant="outlined"
                                label='First Name'
                                sx={{ width: "20%" }}
                            />
                            <TextField
                                variant="outlined"
                                label='Last Name'
                                sx={{ width: "20%" }}
                            />
                            <TextField
                                variant="outlined"
                                label='Email'
                                sx={{ width: "40%" }}
                            />
                        </Box>
                        <Box className="mt-2">
                            <Button variant='standard' className="save_button">Save</Button>
                            <Button variant='standard' className="cancel_button">Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <Box className="edit_client_profile_main_section p-4">
                <Typography className='edit_profile_section_heading' variant='span'>Company details</Typography>
                <Box className="d-flex justify-content-between column">
                    <Box sx={{ width: "15%" }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </Box>
                    <Box sx={{ width: "85%" }} className="d-flex justify-content-between row">
                        <Box className="d-flex justify-content-between column">
                            <TextField
                                variant="outlined"
                                label='Company Name'
                                className="edit_profile_text_field"
                            />
                            <TextField
                                variant="outlined"
                                label='Role in Company'
                                className="edit_profile_text_field"

                            />
                        </Box>
                        <Box className="d-flex justify-content-between column mt-2">
                            <TextField
                                variant="outlined"
                                label='Website'
                                className="edit_profile_text_field"
                            />
                            <TextField
                                variant="outlined"
                                label='Linkedin Profile'
                                className="edit_profile_text_field"
                            />
                        </Box>
                        <FormControl>
                            <FormLabel >How many people are in your company?</FormLabel>
                            <RadioGroup
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="It's just me" />
                                <FormControlLabel value="1" control={<Radio />} label="2-9 employees" />
                                <FormControlLabel value="2" control={<Radio />} label="10-99 employees" />
                                <FormControlLabel value="3" control={<Radio />} label="100-1000 employees" />
                                <FormControlLabel value="4" control={<Radio />} label="More than 1000 employees" />
                            </RadioGroup>
                        </FormControl>
                        <Box className="mt-2">
                            <Button variant='standard' className='save_button'>Save</Button>
                            <Button variant='standard' className="cancel_button">Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}
export default EditClientProfile