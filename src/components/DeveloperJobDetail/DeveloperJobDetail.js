// import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
// import './index.css'
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
// import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
// import Cookie from 'js-cookie';
// import { useMutation } from 'react-query';
// import { request } from '../../utils/axios-utils';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// const DeveloperJobDetail = () => {
//     let { id } = useParams();
//     const [projectDetail, setProjectDetail] = useState({});
//     const { mutate: GetProjectList } = useMutation(request, {
//         onSuccess: (res) => {
//             setProjectDetail(res.data.data);
//             ;
//         },
//         onError: (err) => {
//             console.log(err);
//         }
//     });
//     const handleGetProjectDetail = () => {
//         GetProjectList({
//             url: `/project/details/freelancer?projectId=${id}`,
//             method: 'get',
//             headers: {
//                 Authorization: `${Cookie.get('userToken')}`,
//             },
//         })
//     }
//     useEffect(() => {
//         handleGetProjectDetail();
//     }, [])

//     return (
//         <>
//             <Box className="developer_job_main_section">
//                 <Box className="developer_job_detail_left_section">
//                     <Box className="developer_job_title_desc">
//                         <Typography className="developer_main_heading" variant="span">{projectDetail.title}</Typography>
//                         <Typography>{projectDetail.description}</Typography>
//                     </Box>
//                     <Divider className="mt-3" />
//                     <Box className="developer_job_title_desc">
//                         <Box className="developer_job">
//                             <Box className="developer_job_component">
//                                 <AccessTimeRoundedIcon />
//                                 <Box className="d-flex row">
//                                     <Typography className='mx-1 developer_job_heading'>{projectDetail?.project_duration}</Typography>
//                                     <Typography className='developer_job_sub_heading'>Hourly</Typography>
//                                 </Box>
//                             </Box>
//                             <Box className="developer_job_component">
//                                 <CalendarMonthRoundedIcon />
//                                 <Box className="d-flex row">
//                                     <Typography className='mx-1 pdeveloper_job_heading'>1 to 3 months </Typography>
//                                     <Typography className='developer_job_sub_heading'>Project Length</Typography>
//                                 </Box>
//                             </Box>
//                             <Box className="developer_job_component">
//                                 <SellOutlinedIcon />
//                                 <Box className="d-flex row">
//                                     <Typography className='mx-1 developer_job_heading'>$100.00 </Typography>
//                                     <Typography className='developer_job_sub_heading'>Budget</Typography>
//                                 </Box>
//                             </Box>
//                             <Box className="developer_job_component">
//                                 <EmojiObjectsOutlinedIcon />
//                                 <Box className="d-flex row">
//                                     <Typography className='mx-1 developer_job_heading' >Expert </Typography>
//                                     <Typography className='developer_job_sub_heading'>Comprehensive and deep expertise in this field</Typography>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </Box>
//                     <Divider className="mt-3" />
//                     <Box className="developer_job_title_desc">
//                         <Typography variant='span'><Typography variant="span" className='developer_job_heading'> Job Job Type:</Typography > open </Typography>
//                     </Box>
//                     <Divider className="mt-3" />
//                     <Box className="developer_job_title_desc">
//                         <Typography className="developer_job_heading" variant="span"> Skills and Expertise </Typography>
//                         <Stack direction="row" spacing={1}>
//                             <RectangularChip label="React Js" />
//                             <RectangularChip label="Node Js" />
//                         </Stack>
//                     </Box>
//                     <Divider className="mt-3" />
//                 </Box >
//                 <Box className="developer_job_detail_right_section p-3">
//                     <Button variant="standard" className='common_button'>Apply Now</Button>
//                 </Box>
//             </Box >
//         </>
//     )
// }

// export default DeveloperJobDetail