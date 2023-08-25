import { Box, Button, Tab, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ActiveJobs from '../ActiveJobs/ActiveJobs'
import { useMutation } from 'react-query'
import { request } from '../../utils/axios-utils'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const ClientHomePage = () => {
    const [value, setValue] = useState('active');
    const [projectList, setProjectList] = useState([])
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabStyles = {
        textTransform: 'capitalize',
        textDecoration: 'none',
        fontWeight: '500',
        fontFamily: "Poppins",
        '&.Mui-selected': {
            color: '#7AC144',
        },
    };
    const { mutate: GetProjectList } = useMutation(request, {
        onSuccess: (res) => {
            setProjectList(res.data.data);
            ;
        },
        onError: (err) => {
            console.log(err);
            setProjectList([])
        }
    });
    const handleGetProjectList = () => {
        GetProjectList({
            url: localStorage.getItem('type') == 0 ? `/project/freelancer/list?type=${value}` : `/project/client/list?type=${value}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetProjectList();
    }, [value])
    return (
        <>
            <Box className="client_main_section">
                <Box className="home_page_title">
                    <Typography className="client_main_heading" variant="span">My Jobs</Typography>
                    {
                        localStorage.getItem('type') != 0 && <Button
                            onClick={() => {
                                navigate("/jobdetail")
                            }}
                            variant='outlined' className="post_job_button">Post a New Job</Button>
                    }
                </Box>
                <Box className="home_page_section">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} >
                                <Tab sx={tabStyles} label="Active" value="active" />
                                {localStorage.getItem('type') == 0 && <Tab sx={tabStyles} label="Invitation" value="invited" />}
                                {localStorage.getItem('type') == 1 && <Tab sx={tabStyles} label="Draft" value="draft" />}
                                <Tab sx={tabStyles} label="Recently filled" value="recently-filled" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ padding: 0 }} value="active"><ActiveJobs projectList={projectList} /></TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="invited"><ActiveJobs projectList={projectList} /></TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="draft"><ActiveJobs projectList={projectList} /></TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="recently-filled"><ActiveJobs projectList={projectList} /></TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </>
    )
}

export default ClientHomePage