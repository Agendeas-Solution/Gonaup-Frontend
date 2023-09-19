import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { requestAdmin } from '../../utils/axios-utils';
import Cookie from 'js-cookie'
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
const AdminProfile = () => {
    const [userDetail, setUserDetail] = useState(null);
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate } = useMutation(requestAdmin, {
        onSuccess: (response) => {
            setUserDetail(response.data.data);
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    useEffect(() => {
        mutate({
            url: '/admin',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    return (
        <>
            <Box className="staff_profile">
                <Box className="staff_profile_page">
                    <Typography className="profile_data_lable" variant="span">
                        Name:
                    </Typography>
                    <Typography variant="span">
                        {userDetail?.name || '-'}
                    </Typography>
                </Box>
                <Box className="staff_profile_page">
                    <Typography variant="span" className="profile_data_lable">
                        Email:
                    </Typography>
                    <Typography variant="span">{userDetail?.email}</Typography>
                </Box>
            </Box>

        </>
    )
}

export default AdminProfile