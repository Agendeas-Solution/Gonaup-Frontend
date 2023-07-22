import React from 'react'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import './index.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
const ClientProjectDetails = () => {
    return (
        <>
            <Box className="client_project_main_section">
                <Box className="client_project_detail_left_section">
                    <Box className="client_project_title_desc">
                        <Typography className="client_main_heading" variant="span">Lorem Ipsum is simply dummy text of the</Typography>
                        <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when anunknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Typography>
                    </Box>
                    <Divider className="mt-3" />
                    <Box className="client_project_title_desc">
                        <Box className="project_detail">
                            <Box className="project_detail_component">
                                <AccessTimeRoundedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading'>More than 30 hrs/week</Typography>
                                    <Typography className='project_detail_sub_heading'>Hourly</Typography>
                                </Box>
                            </Box>
                            <Box className="project_detail_component">
                                <CalendarMonthRoundedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading'>1 to 3 months </Typography>
                                    <Typography className='project_detail_sub_heading'>Project Length</Typography>
                                </Box>
                            </Box>
                            <Box className="project_detail_component">
                                <SellOutlinedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading'>$100.00 </Typography>
                                    <Typography className='project_detail_sub_heading'>Budget</Typography>
                                </Box>
                            </Box>
                            <Box className="project_detail_component">
                                <EmojiObjectsOutlinedIcon />
                                <Box className="d-flex row">
                                    <Typography className='mx-1 project_detail_heading' >Expert </Typography>
                                    <Typography className='project_detail_sub_heading'>Comprehensive and deep expertise in this field</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Divider className="mt-3" />
                    <Box className="client_project_title_desc">
                        <Typography variant='span'><Typography variant="span" className='project_detail_heading'> Project Type:</Typography > Ongoing project </Typography>
                    </Box>
                    <Divider className="mt-3" />
                    <Box className="client_project_title_desc">
                        <Typography className="project_detail_heading" variant="span"> Skills and Expertise </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label="React Js" />
                            <Chip label="Node Js" />
                        </Stack>
                    </Box>
                    <Divider className="mt-3" />
                    <Box className="client_project_title_desc">
                        <Typography className="project_detail_heading" variant="span"> Suggested  Talent</Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Daniel C." />
                            <Chip label="Johnny d." />
                        </Stack>
                    </Box>
                </Box >
                <Box className="client_project_detail_right_section">
                    <Button variant="standard" className='client_project_detail_button'><EditIcon />Edit Posting</Button>
                    <Button variant="standard" className='client_project_detail_button'><DeleteRoundedIcon />Delete Posting</Button>
                </Box>
            </Box >
        </>
    )
}

export default ClientProjectDetails