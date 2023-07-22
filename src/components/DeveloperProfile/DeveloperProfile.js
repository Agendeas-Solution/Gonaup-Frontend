import { Avatar, Box, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import DoneIcon from '@mui/icons-material/Done';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Logo from '../../assets/images/logo.svg'

const DeveloperProfile = () => {
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const [developerDetail, setDeveloperDetail] = useState({})
    const { mutate: GetDeveloperProfile } = useMutation(request, {
        onSuccess: (res) => {
            setDeveloperDetail(res.data.data)
            debugger;
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetDeveloperProfile({
            url: '/user/profile',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const { mutate: GetSkillList } = useMutation(request, {
        onSuccess: (res) => {
            setServiceSkillList((prevState) => ({
                ...prevState,
                skillList: res.data.data,
            }));
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetSkillList({
            url: '/search/skill/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    return (
        <>
            <Box className="developer_profile_main_section">
                <Typography variant='span' className='developer_main_heading'> Account</Typography>
                <Box className="d-flex column justify-content-between">
                    <Box className="d-flex column">
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                        <Box className="d-flex row mx-2">
                            <Typography className='developer_main_heading' variant="span">{developerDetail.first_name} {developerDetail.last_name}<EditRoundedIcon className='circular_icon' /></Typography>
                            <Typography variant="span">{developerDetail.state_name}, {developerDetail.country_name}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography className='developer_main_heading' variant="span"> ${developerDetail.hourly_rate}/hr<EditRoundedIcon className='circular_icon' /></Typography>
                    </Box>
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">{
                            developerDetail.professional_role}</Typography>
                        <EditRoundedIcon className='circular_icon' />
                    </Box>
                    <Typography>{developerDetail?.description}</Typography>
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Skills and Expertise</Typography>
                        <EditRoundedIcon className='circular_icon' />
                    </Box>
                    <Box>
                        {developerDetail.skills.map((chip) => (
                            <Chip
                                variant="outlined"
                                color="success"
                                key={chip.id}
                                deleteIcon={<DoneIcon />}
                                label={chip.name}
                                style={{ margin: '4px' }}
                            />
                        ))}
                        {developerDetail.services_offer.map((chip) => (
                            <Chip
                                variant="outlined"
                                color="success"
                                key={chip.id}
                                deleteIcon={<DoneIcon />}
                                label={chip.name}
                                style={{ margin: '4px' }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Portfolio Link</Typography>
                        <EditRoundedIcon className='circular_icon' />
                    </Box>
                    <Box className="w-100 d-flex row justify-content-between">
                        <Box className="w-50">
                            <Typography className="sub_heading">Freelancer</Typography>
                            <Typography>{developerDetail.freelance_profile}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">Linkedin</Typography>
                            <Typography>{developerDetail.linkdin_profile}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">Github</Typography>
                            <Typography>{developerDetail.github_profile}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Contact</Typography>
                        <EditRoundedIcon className='circular_icon' />
                    </Box>
                    <Box className="w-100 d-flex row justify-content-between">
                        <Box className="w-50">
                            <Typography className="sub_heading">Phone</Typography>
                            <Typography>{developerDetail.contact_number}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">Skype</Typography>
                            <Typography>{developerDetail.skype_id}    </Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">Country</Typography>
                            <Typography>{developerDetail.country_name}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">City</Typography>
                            <Typography>{developerDetail.city_name}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">State</Typography>
                            <Typography>{developerDetail.state_name}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">Zip/Postal Code</Typography>
                            <Typography>{developerDetail.zip_code}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">Address</Typography>
                            <Typography>{developerDetail.address}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Education</Typography>
                        <AddRoundedIcon className='circular_icon' />
                    </Box>
                    <Box className="d-flex column justify-content-between mt-2">
                        {
                            developerDetail.education.map((data) => {
                                return <Box className="developer_education_box">
                                    <Box className="d-flex row">
                                        <Box className="d-flex column">
                                            <Typography className="developer_main_heading" variant="span">{data.school}</Typography>
                                            <Box className="d-flex column">
                                                <EditRoundedIcon className='circular_icon' />
                                                <DeleteRoundedIcon className='circular_icon' />
                                            </Box>
                                        </Box>
                                        <Typography variant="span">{data.degree}/</Typography>
                                        <Typography className='sub_heading' variant="span">{data.date_from} - {data.date_to}</Typography>
                                    </Box>
                                </Box>
                            })
                        }
                    </Box>
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Experience </Typography>
                        <AddRoundedIcon className='circular_icon' />
                    </Box>
                    {developerDetail.experience.map((data) => {
                        return <Box>
                            <Box className="experience_detail">
                                <Box className="d-flex row">
                                    <Typography className="h5" variant='span'>{data.title}| {data.company}</Typography>
                                    <Typography className='sub_heading' variant='span'>{data.working_from} - {data.working_to}</Typography>
                                </Box>
                                <Box className="d-flex column">
                                    <EditRoundedIcon className='circular_icon' />
                                    <DeleteRoundedIcon className='circular_icon' />
                                </Box>
                            </Box>
                        </Box>
                    })}
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Portfolio </Typography>
                        <AddRoundedIcon className='circular_icon' />
                    </Box>
                    <Box className="d-flex row justify-content-between">
                        {developerDetail.projects.map((data) => {
                            return <Card className="d-flex row" sx={{ maxWidth: "33%" }}>
                                <img
                                    src={data.project_image_url}
                                />
                                <Box className="d-flex">
                                    <Typography className="developer_main_heading m-2" variant="span">
                                        {data.title}
                                    </Typography>
                                    <EditRoundedIcon className='circular_icon' />
                                    <DeleteRoundedIcon className='circular_icon' />
                                </Box>
                            </Card>
                        })}
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default DeveloperProfile