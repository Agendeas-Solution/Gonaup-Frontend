import { Box, Button, Divider, Menu, Fade, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
const ActiveJobs = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [projectList, setProjectList] = useState([]);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
            {
                projectList && projectList.map((data) => {
                    return <Box className="active_job_section">
                        <Box className="d-flex column justify-content-between">
                            <Typography variant="span" className='active_job_heading'>Lorem Ipsum is simply dummy text of the printing</Typography>
                            <Box>
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
                                    <MenuItem onClick={handleClose}>Delete Posting</MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                        <Typography variant='span'>{data.title}</Typography>
                        <Typography variant="span">{data.skills}</Typography>
                        <Typography variant="span" sx={{ color: "#8E8E8E" }}>Created - {data.created_at}</Typography>
                    </Box>
                })
            }

        </>
    )
}

export default ActiveJobs