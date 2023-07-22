import { Box, Button, Tab, Typography } from '@mui/material'
import React from 'react'
import './index.css'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ActiveJobs from '../ActiveJobs/ActiveJobs'
const ClientHomePage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box className="client_main_section">
                <Box className="home_page_title">
                    <Typography className="client_main_heading" variant="span">My Jobs</Typography>
                    <Button variant='outlined' className="post_job_button">Post a New Job</Button>
                </Box>
                <Box className="home_page_section">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} >
                                <Tab label="Active" value="1" />
                                <Tab label="Draft" value="2" />
                                <Tab label="Recently filled" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ padding: 0 }} value="1"><ActiveJobs /></TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </>
    )
}

export default ClientHomePage