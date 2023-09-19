import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import Cookie from 'js-cookie'
import { request } from '../../utils/axios-utils';
import { Box, Button, Typography } from '@mui/material';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'

const FreelanceExperienceList = () => {
    const [experienceList, setExperienceList] = useState([]);
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate: GetFreelanceExperienceList } = useMutation(request, {
        onSuccess: (res) => {
            setExperienceList(res.data.data);
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const { mutate: DeleteFreeLanceExperience } = useMutation(request, {
        onSuccess: (res) => {
            setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.data.message,
            })
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    useEffect(() => {
        GetFreelanceExperienceList({
            url: '/user/freelancer/experience/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleDeleteExperience = async (id) => {
        await DeleteFreeLanceExperience({
            url: '/user/freelancer/experience',
            method: 'delete',
            data: { experienceId: id },
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    };
    return (
        <>
            {experienceList?.experienceList && experienceList.experienceList.map((data) => {
                return <Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Name:
                        </Typography>
                        <Typography variant="span">
                            {data?.name || '-'}
                        </Typography>
                    </Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Experienced Years:
                        </Typography>
                        <Typography variant="span">
                            {data?.experienced_years || '-'}
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
                    <Button variant="contained" onClick={() => {
                        handleDeleteExperience(data.id)
                    }}>Delete</Button>
                </Box>
            })}
        </>
    )
}

export default FreelanceExperienceList