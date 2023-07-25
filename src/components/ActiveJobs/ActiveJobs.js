import { Box, Button, Divider, Menu, Fade, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import DeleteProjectDialog from '../DeleteProjectDialog/DeleteProjectDialog';
const ActiveJobs = ({ projectList }) => {
    const [deleteProjectDialogControl, setDeleteProjectDialogControl] = useState({
        status: false,
        reason: "",
        projectId: null
    })
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setDeleteProjectDialogControl({ ...deleteProjectDialogControl, status: false })
    };
    const { mutate: DeleteProject } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleDeleteProject = (id) => {
        DeleteProject({
            url: `/project/close`,
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                reason: deleteProjectDialogControl.reason,
                projectId: id
            }
        })
    }
    return (
        <>
            {
                projectList.projectList && projectList.projectList.map((data) => {
                    return <Box className="active_job_section"
                        onClick={() => {
                            const type = localStorage.getItem('type');
                            console.log("printing", parseInt(type) == 0)
                            if (parseInt(type) === 0) {
                                navigate(`/freelancerprojectdetails/${data.id}`);
                            }
                            else if (parseInt(type) === 1) {
                                navigate(`/clientprojectdetails/${data.id}`);
                            }
                        }}
                    >
                        {
                            <Box className="d-flex column justify-content-between" >
                                <Typography variant="span" className='active_job_heading'>{data.title}</Typography>
                                {localStorage.getItem('type') == 1 && <Box>
                                    <IconButton
                                        id="fade-button"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={handleClose}>View Posting</MenuItem>
                                        <MenuItem onClick={handleClose}>Edit Posting</MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setDeleteProjectDialogControl({ ...deleteProjectDialogControl, status: true, projectId: data.id })
                                            }}
                                        >Delete Posting</MenuItem>
                                    </Menu>
                                </Box>}
                            </Box>
                        }
                        <Typography variant='span'>{data.title}</Typography>
                        <Typography variant="span">{data.skills}</Typography>
                        <Typography variant="span" sx={{ color: "#8E8E8E" }}>Created - {data.created_at}</Typography>
                        <DeleteProjectDialog deleteProjectDialogControl={deleteProjectDialogControl} handleClose={handleClose} setDeleteProjectDialogControl={setDeleteProjectDialogControl} handleDeleteProject={handleDeleteProject} />
                    </Box >
                })
            }

        </>
    )
}

export default ActiveJobs