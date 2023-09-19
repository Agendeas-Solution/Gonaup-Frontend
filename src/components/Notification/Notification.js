import { Box, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './index.css'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
const Notification = () => {
    const [notificationDetail, setNotificationDetail] = useState({});
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate: GetProjectList } = useMutation(request, {
        onSuccess: (res) => {
            setNotificationDetail(res.data.data);
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleGetProjectDetail = () => {
        GetProjectList({
            url: `/notifications/list`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetProjectDetail();
    }, [])
    return (
        <>
            <Box className="notification_section">
                <Typography variant="span" className="developer_main_heading mb-3">Notifications</Typography>
                {
                    notificationDetail.notificationList && notificationDetail.notificationList.map((data) => {
                        return <>
                            <Box className="d-flex column align-items-center">
                                <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Box className="d-flex row" sx={{ marginLeft: "10px" }}>
                                    <Typography variant="span">{data.title}</Typography>
                                    <Typography variant="span">{data.content}</Typography>
                                    <Typography className="sub_heading" variant="span">May 11, 2023</Typography>
                                </Box>
                            </Box>
                            <Divider className='mt-3 mb-3' variant='vertical' />
                        </>
                    })
                }
            </Box>
        </>
    )
}

export default Notification