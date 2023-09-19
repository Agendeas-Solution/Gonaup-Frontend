import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useContext, useEffect, useState } from 'react'
import ActiveJobs from '../ActiveJobs/ActiveJobs'
import { Box, Button, Tab, Typography } from '@mui/material'
import { useMutation } from 'react-query'
import { request } from '../../utils/axios-utils'
import Cookie from 'js-cookie'
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'

const DeveloperHomePage = () => {
    const [value, setValue] = React.useState('1');
    const [projectList, setProjectList] = useState([]);
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { mutate: GetProjectList } = useMutation(request, {
        onSuccess: (res) => {
            setProjectList(res.data.data);

        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })

        }
    });
    const handleGetProjectList = () => {
        GetProjectList({
            url: '/project/client/list?type=active',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetProjectList();
    }, [])
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
                        <TabPanel sx={{ padding: 0 }} value="1"><ActiveJobs projectList={projectList} /></TabPanel>
                        <TabPanel value="2"><ActiveJobs projectList={projectList} /></TabPanel>
                        <TabPanel value="3"><ActiveJobs projectList={projectList} /></TabPanel>
                    </TabContext>
                </Box>
            </Box></>
    )
}

export default DeveloperHomePage