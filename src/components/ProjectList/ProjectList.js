import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'

const ProjectList = () => {
    const [projectDetail, setProjectDetail] = useState(null);
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const navigate = useNavigate();
    const { mutate } = useMutation(request, {
        onSuccess: (response) => {
            setProjectDetail(response.data.data);
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    useEffect(() => {
        mutate({
            url: '/project/client/list?type=active',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    return (
        <>
            <Box className="staff_profile">
                {projectDetail?.projectList.length > 0 && projectDetail.projectList.map((data) => {
                    return <>
                        <Box className="staff_profile_page">
                            <Typography className="profile_data_lable" variant="span">
                                Title:
                            </Typography>
                            <Typography variant="span">
                                {data?.title || '-'}
                            </Typography>
                        </Box>
                        <Box className="staff_profile_page">
                            <Typography className="profile_data_lable" variant="span">
                                Description:
                            </Typography>
                            <Typography variant="span">
                                {data?.description || '-'}
                            </Typography>
                        </Box>
                        <Box className="staff_profile_page">
                            <Typography className="profile_data_lable" variant="span">
                                Fixed Budget:
                            </Typography>
                            <Typography variant="span">
                                {data?.fixed_budget || '-'}
                            </Typography>
                        </Box>
                        <Box className="staff_profile_page">
                            <Typography className="profile_data_lable" variant="span">
                                Hourly Budget:
                            </Typography>
                            <Typography variant="span">
                                {data?.hourly_budget || '-'}
                            </Typography>
                        </Box>
                        <Box className="staff_profile_page">
                            <Typography className="profile_data_lable" variant="span">
                                Project Duration:
                            </Typography>
                            <Typography variant="span">
                                {data?.project_duration || '-'}
                            </Typography>
                        </Box>
                        <Box className="staff_profile_page">
                            <Button onClick={() => {
                                navigate(`/projectdetail/${data?.id}`)
                            }} className="profile_data_lable">
                                View
                            </Button>
                        </Box>
                    </>
                })}
            </Box>
        </>
    )
}

export default ProjectList