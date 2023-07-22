import { TabContext, TabList, TabPanel } from '@mui/lab'
import React from 'react'
import ActiveJobs from '../ActiveJobs/ActiveJobs'
import { Box, Button, Tab, Typography } from '@mui/material'
const DeveloperHomePage = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box className="developer_main_section">
                <Typography className="client_main_heading" variant="span">My Jobs</Typography>
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
            </Box></>
    )
}

export default DeveloperHomePage