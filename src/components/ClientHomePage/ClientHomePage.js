import { Box, Button, Tab, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ActiveJobs from '../ActiveJobs/ActiveJobs'
import { useMutation } from 'react-query'
import { request } from '../../utils/axios-utils'
import Cookie from 'js-cookie'
const ClientHomePage = () => {
    const [value, setValue] = useState('active');
    const [projectList, setProjectList] = useState([])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { mutate: GetProjectList } = useMutation(request, {
        onSuccess: (res) => {
            setProjectList(res.data.data);
            debugger;
        },
        onError: (err) => {
            console.log(err);
            setProjectList([])
        }
    });
    const handleGetProjectList = () => {
        {
            localStorage.getItem('type') == 1 &&
                GetProjectList({
                    url: `/project/client/list?type=${value}`,
                    method: 'get',
                    headers: {
                        Authorization: `${Cookie.get('userToken')}`,
                    },
                })
        }
        {
            localStorage.getItem('type') == 0 &&
                GetProjectList({
                    url: `/project/freelancer/list?type=${value}`,
                    method: 'get',
                    headers: {
                        Authorization: `${Cookie.get('userToken')}`,
                    },
                })
        }
    }
    useEffect(() => {
        handleGetProjectList();
    }, [value])
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
                                <Tab label="Active" value="active" />
                                <Tab label="Draft" value="draft" />
                                <Tab label="Recently filled" value="recently-filled" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ padding: 0 }} value="active"><ActiveJobs projectList={projectList} /></TabPanel>
                        <TabPanel value="draft"><ActiveJobs projectList={projectList} /></TabPanel>
                        <TabPanel value="recently-filled"><ActiveJobs projectList={projectList} /></TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </>
    )
}

export default ClientHomePage