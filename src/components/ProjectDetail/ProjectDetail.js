import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css';
import EducationLogo from '../../assets/images/education.svg'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddProjectDialog from '../AddProjectDialog/AddProjectDialog';
import { request } from '../../utils/axios-utils';
import { useMutation } from 'react-query';
import Cookie from 'js-cookie';
const ProjectDetail = () => {
    const [addProjectDialogStatus, setAddProjectDialogStatus] = useState({
        status: false,
        title: '',
        projectUrl: '',
        skills: '',
        dateFrom: null,
        dateTo: null,
        description: "",
    })
    const [projectList, setProjectList] = useState([]);
    const handleDialogClose = () => {
        setAddProjectDialogStatus({ ...addProjectDialogStatus, status: false });
    }
    const { mutate: GetProjectList } = useMutation(request, {
        onSuccess: (res) => {
            setProjectList(res.data.data);
            debugger;
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetProjectList = () => {
        GetProjectList({
            url: '/user/freelancer/project/list',
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
            <Box className="main_section">

                <Typography className="main_section_heading" variant='span'>3/7</Typography>
                <Typography className="main_section_heading" variant='span'>Share Past Project Images, Links, Titles, Descriptions, and Timelines</Typography>
                <Typography className="main_section_description" variant='span'>Highlight your expertise and track record by sharing the visual essence of your past projects. This comprehensive showcase of your professional journey allows us to gain insight into your capabilities and accomplishments.</Typography>
                <Box className="d-flex">
                    <Button className='project_detail_button' variant='outlined' onClick={() => {
                        setAddProjectDialogStatus({ ...addProjectDialogStatus, status: true });
                    }} >+ Add Projects</Button>
                    {projectList.map((data) => {
                        return <Box className="project_detail_box">
                            <img style={{ width: "150px", height: "150px", margin: "0 auto" }} src={data.project_image_url} alt="" />
                            <Box className="d-flex justify-content-between align-items-center">
                                <Typography variant='subtitle1'>{data.title}</Typography>
                                <Box>
                                    <Button className="project_detail_box_button"><EditRoundedIcon /></Button>
                                    <Button className="project_detail_box_button"><DeleteOutlineRoundedIcon />
                                    </Button>
                                </Box>
                            </Box>Z
                        </Box>
                    })}
                </Box>
            </Box>
            <AddProjectDialog addProjectDialogStatus={addProjectDialogStatus} setAddProjectDialogStatus={setAddProjectDialogStatus} handleDialogClose={handleDialogClose} />
        </ >
    )
}

export default ProjectDetail