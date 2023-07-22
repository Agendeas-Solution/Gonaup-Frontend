import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import Avatar from '@mui/material/Avatar';
import './index.css'
const Notification = () => {
    return (
        <>
            <Box className="notification_section">
                <Typography variant="span" className="developer_main_heading">Notifications</Typography>
                <Box className="d-flex column align-items-center">
                    <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Box className="d-flex row" sx={{ marginLeft: "10px" }}>
                        <Typography variant="span">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</Typography>
                        <Typography className="sub_heading" variant="span">May 11, 2023</Typography>
                    </Box>
                </Box>
                <Divider className="mt-2" />
                <Box className="d-flex column align-items-center">
                    <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Box className="d-flex row" sx={{ marginLeft: "10px" }}>
                        <Typography variant="span">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</Typography>
                        <Typography className="sub_heading" variant="span">May 11, 2023</Typography>
                    </Box>
                </Box>
                <Divider className="mt-2" />
            </Box>
        </>
    )
}

export default Notification