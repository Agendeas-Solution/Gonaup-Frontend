import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './index.css'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
const Notification = () => {
    const [notificationDetail, setNotificationDetail] = useState({});
    const { mutate: GetProjectList } = useMutation(request, {
        onSuccess: (res) => {
            setNotificationDetail(res.data.data);
        },
        onError: (err) => {
            console.log(err);
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
                <Typography variant="span" className="developer_main_heading">Notifications</Typography>
                {
                    notificationDetail.notificationList && notificationDetail.notificationList.map((data) => {
                        return <Box className="d-flex column align-items-center">
                            <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Box className="d-flex row" sx={{ marginLeft: "10px" }}>
                                <Typography variant="span">{data.title}</Typography>
                                <Typography variant="span">{data.content}</Typography>
                                <Typography className="sub_heading" variant="span">May 11, 2023</Typography>
                            </Box>
                        </Box>
                    })
                }
            </Box>
        </>
    )
}

export default Notification