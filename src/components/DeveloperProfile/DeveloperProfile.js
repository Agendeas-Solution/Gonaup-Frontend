import { Avatar, Box, Button, Chip, Typography } from '@mui/material'
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
import EditHourlyRateDialog from './EditHourlyRateDialog';
import EditUserNameDialog from './EditUserNameDialog';
import EditRoleAndOverviewDialog from './EditRoleAndOverviewDialog';
import EditSkillServiceDialog from './EditSkillServiceDialog';
import EditProfileLinkDialog from './EditProfileLinkDialog';
import EditContactDialog from './EditContactDialog';
import AddEducationDialog from '../AddEducationDialog/AddEducationDialog';
import DeleteEducationDialog from '../DeleteEducationDialog/DeleteEducationDialog';
import AddExperienceDialog from '../AddExperienceDialog/AddExperienceDialog';
import DeleteExperienceDialog from '../DeleteExperienceDialog/DeleteExperienceDialog';
import AddProjectDialog from '../AddProjectDialog/AddProjectDialog';
import DeleteFreelancerProjectDialog from '../DeleteFreelancerProjectDialog/DeleteFreelancerProjectDialog';
import ProjectDetailDialog from './ProjectDetailDialog';
const DeveloperProfile = () => {
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const [educationDetail, setEducationDetail] = useState({
        school: "",
        degree: "",
        studyIn: "",
        description: "",
        dateFrom: null,
        dateTo: null
    })
    const [developerDetail, setDeveloperDetail] = useState({})

    const [editUserNameDialogControl, setEditUserNameDialogControl] = useState({
        status: false, firstName: "", lastName: ""
    })
    const [editHourlyRateDialogControl, setEditHourlyRateDialogControl] = useState({
        status: false,
    })
    const [editRoleAndOverviewDialogControl, setEditRoleAndOverviewDialogControl] = useState({
        status: false
    })
    const [editSkillDialogControl, setEditSkillDialogControl] = useState({
        status: false, skills: [], services: []
    })
    const [editProfileLinkDialogControl, setEditProfileLinkDialogControl] = useState({
        status: false
    })
    const [editContactDialogControl, setEditContactDialogControl] = useState({
        status: false
    })
    const [addEducationDialogStatus, setAddEducationDialogStatus] = useState(false)
    const [deleteEducationDialogStatus, setDeleteEducationDialogStatus] = useState({
        status: false,
        id: null
    })
    const [addExperienceDialogStatus, setAddExperienceDialogStatus] = useState(false);
    const [deleteExperienceDialogStatus, setDeleteExperienceDialogStatus] = useState({
        status: false, id: null
    })
    const [deleteFreelancerProjectDialogControl, setDeleteFreelancerProjectDialogControl] = useState({
        status: false, id: null
    })
    const [projectDetailDialogControl, setProjectDetailDialogControl] = useState({
        status: false,
    })
    const [experienceDetail, setExperienceDetail] = useState({
        title: null,
        company: null,
        countryId: null,
        countryName: null,
        countryCode: null,
        isWorking: false,
        cityName: null,
        workingFrom: null,
        workgingTo: null,
        description: null
    });
    const [addProjectDialogStatus, setAddProjectDialogStatus] = useState({
        status: false,
        title: '',
        projectUrl: '',
        skills: '',
        dateFrom: null,
        dateTo: null,
        description: "",
    })
    const { mutate: AddFreelancerExperience } = useMutation(request, {
        onSuccess: (res) => {
            setAddExperienceDialogStatus(false)
        },
        onError: (err) => {
        }
    });
    const { mutate: DeleteExperience } = useMutation(request, {
        onSuccess: (res) => {
            setDeleteExperienceDialogStatus({ ...deleteExperienceDialogStatus, status: false })
        },
        onError: (err) => {
        }
    });
    const handleDeleteExperience = async (id) => {
        await DeleteExperience({
            url: '/user/freelancer/experience',
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: { experienceId: id },
        })
    }
    const handleAddExperience = async () => {
        let data = {
            title: experienceDetail.title,
            company: experienceDetail.company,
            countryId: experienceDetail.country.id,
            countryName: experienceDetail.country.name,
            countryCode: experienceDetail.country.iso2,
            isWorking: experienceDetail.isWorking,
            cityName: experienceDetail.cityName,
            workingFrom: experienceDetail.workingFrom,
            workgingTo: experienceDetail.workgingTo,
            description: experienceDetail.description
        }
        if (experienceDetail.id) {
            data["experienceId"] = experienceDetail.id
        }
        await AddFreelancerExperience({
            url: '/user/freelancer/experience',
            method: experienceDetail.id ? 'put' : 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: data,
        })
    }
    const { mutate: AddFreelancerEducation } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
            setEducationDetail({
                school: "",
                degree: "",
                studyIn: "",
                description: "",
                dateFrom: null,
                dateTo: null
            })
        },
        onError: (err) => {
            ;
        }
    });
    const handleAddEducationDetail = async () => {
        let educationData = {
            school: educationDetail.school,
            degree: educationDetail.degree,
            studyIn: educationDetail.studyIn,
            description: educationDetail.description,
            dateFrom: isNaN(educationDetail.dateFrom) ? educationDetail.dateFrom.year() : educationDetail.dateFrom,
            dateTo: isNaN(educationDetail.dateTo) ? educationDetail.dateTo.year() : educationDetail.dateTo
        };
        if (educationDetail.id) {
            educationData["educationId"] = educationDetail.id;
        }
        await AddFreelancerEducation({
            url: '/user/freelancer/education',
            method: educationDetail.id ? 'put' : 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: educationData,
        })
    }
    const { mutate: DeleteEducation } = useMutation(request, {
        onSuccess: (res) => {
            setDeleteEducationDialogStatus({ ...deleteEducationDialogStatus, status: false })
        },
        onError: (err) => {
            ;
        }
    });
    const handleDeleteEducation = async (id) => {
        await DeleteEducation({
            url: '/user/freelancer/education',
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: { educationId: id },
        })
    }
    const { mutate: GetDeveloperProfile } = useMutation(request, {
        onSuccess: (res) => {
            setDeveloperDetail(res.data.data)
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
    const { mutate: EditUserName } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleEditUserName = () => {
        EditUserName({
            url: '/user/profile',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const { mutate: EditHourlyRate } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleEditHourlyRate = () => {
        EditHourlyRate({
            url: '/user/freelancer/hourly-rate',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const handleClose = () => {
        setEditUserNameDialogControl({ ...editUserNameDialogControl, status: false })
        setEditHourlyRateDialogControl({ ...editHourlyRateDialogControl, status: false })
        setEditRoleAndOverviewDialogControl({ ...editRoleAndOverviewDialogControl, status: false })
        setEditSkillDialogControl({ ...editSkillDialogControl, status: false })
        setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, status: false })
        setEditContactDialogControl({ ...editContactDialogControl, status: false })
        setAddEducationDialogStatus(false)
        setAddExperienceDialogStatus(false);
        setDeleteExperienceDialogStatus(false);
        setDeleteEducationDialogStatus({ ...deleteEducationDialogStatus, status: false })
        setAddProjectDialogStatus({ ...addProjectDialogStatus, status: false });
        setDeleteFreelancerProjectDialogControl({ ...deleteFreelancerProjectDialogControl, status: false })
        setProjectDetailDialogControl({ ...projectDetailDialogControl, status: false })
    }
    const { mutate: EditRoleAndOverview } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleEditRoleAndOverviewDialog = () => {
        EditRoleAndOverview({
            url: '/user/freelancer/role',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                professionalRole: editRoleAndOverviewDialogControl.professionalRole,
                description: editRoleAndOverviewDialogControl.description
            }
        })
    }
    const { mutate: EditSkill } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleEditSkillDialog = (selectedSkillSets) => {
        EditSkill({
            url: '/user/freelancer/skill',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                skills: selectedSkillSets.skills.map((data) => data.id).join(","),
                offerServices: selectedSkillSets.services.map((data) => data.id).join(",")
            }
        })
    }
    const { mutate: EditProfileLink } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleEditProfileLink = () => {
        EditProfileLink({
            url: '/user/freelancer/profile-links',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                githubProfile: editProfileLinkDialogControl.githubProfile,
                linkdinProfile: editProfileLinkDialogControl.linkdinProfile,
                freelanceProfile: editProfileLinkDialogControl.freelanceProfile
            }
        })
    }
    const { mutate: EditContactDetail } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleEditContactDetail = (image_url) => {
        let contactDetail = new FormData();
        contactDetail.append('contactNumber', editContactDialogControl.contactNumber)
        contactDetail.append('skypeId', editContactDialogControl.skypeId)
        contactDetail.append('address', editContactDialogControl.address)
        contactDetail.append('countryId', editContactDialogControl.country.id)
        contactDetail.append('countryCode', editContactDialogControl.country.iso2)
        contactDetail.append('countryName', editContactDialogControl.country.name)
        contactDetail.append('stateId', editContactDialogControl.state.id)
        contactDetail.append('stateCode', editContactDialogControl.state.iso2)
        contactDetail.append('stateName', editContactDialogControl.state.name)
        contactDetail.append('cityId', editContactDialogControl.city.id)
        contactDetail.append('cityName', editContactDialogControl.city.name)
        contactDetail.append('zipCode', editContactDialogControl.zipCode)
        if (typeof image_url !== 'string') {
            contactDetail.append('profile_image', image_url)
        }
        EditContactDetail({
            url: '/user/freelancer/contact-details',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: contactDetail
        })
    }
    const { mutate: DeleteFreelancerProject } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
        }
    });
    const handleDeleteFreelancerProject = async (id) => {
        await DeleteFreelancerProject({
            url: '/user/freelancer/project',
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: { projectId: id },
        })
    }

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
                            <Typography className='developer_main_heading' variant="span">{developerDetail.first_name} {developerDetail.last_name}<EditRoundedIcon onClick={() => {
                                setEditUserNameDialogControl({ ...editUserNameDialogControl, status: true, firstName: developerDetail.first_name, lastName: developerDetail.last_name })
                            }}
                                className='circular_icon' /></Typography>
                            <Typography variant="span">{developerDetail.state_name}, {developerDetail.country_name}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography className='developer_main_heading' variant="span"> ${developerDetail.hourly_rate}/hr
                            <EditRoundedIcon onClick={() => {
                                setEditHourlyRateDialogControl({ ...editHourlyRateDialogControl, status: true, hourlyRate: developerDetail.hourly_rate })
                            }} className='circular_icon' />
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="developer_profile_main_section">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">{
                            developerDetail.professional_role}</Typography>
                        <EditRoundedIcon onClick={() => {
                            setEditRoleAndOverviewDialogControl({ ...editRoleAndOverviewDialogControl, status: true, professionalRole: developerDetail.professional_role, description: developerDetail?.description })
                        }} className='circular_icon' />
                    </Box>
                    <Typography>{developerDetail?.description}</Typography>
                </Box>
            </Box >
            <Box className="developer_profile_main_section">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Skills and Expertise</Typography>
                        <EditRoundedIcon onClick={() => {
                            setEditSkillDialogControl({ ...editSkillDialogControl, status: true, skills: developerDetail.skills, services: developerDetail.services_offer })
                        }} className='circular_icon' />
                    </Box>
                    <Box>
                        {developerDetail.skills && developerDetail.skills.map((chip) => (
                            <Chip
                                variant="outlined"
                                color="success"
                                key={chip.id}
                                deleteIcon={<DoneIcon />}
                                label={chip.name}
                                style={{ margin: '4px' }}
                            />
                        ))}
                        {developerDetail.services_offer && developerDetail.services_offer.map((chip) => (
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
                        <EditRoundedIcon onClick={() => {
                            setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, status: true, linkdinProfile: developerDetail.linkdin_profile, freelanceProfile: developerDetail.freelance_profile, githubProfile: developerDetail.github_profile })
                        }} className='circular_icon' />
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
                        <EditRoundedIcon onClick={() =>
                            setEditContactDialogControl({
                                ...editContactDialogControl,
                                status: true,
                                image_url: developerDetail.image_url,
                                contactNumber: developerDetail.contact_number,
                                skypeId: developerDetail.skype_id,
                                address: developerDetail.address,
                                zipCode: developerDetail.zip_code,
                                country: {
                                    name: developerDetail.country_name,
                                    id: developerDetail.country_id,
                                    iso2: developerDetail.country_code
                                },
                                state: {
                                    iso2: developerDetail.state_code,
                                    id: developerDetail.state_id,
                                    name: developerDetail.state_name
                                },
                                city: { name: developerDetail.city_name, id: developerDetail.city_id }
                            })} className='circular_icon' />
                    </Box>
                    <Box className="w-100 d-flex row justify-content-between">
                        <Box className="w-50">
                            <Typography className="sub_heading">Phone</Typography>
                            <Typography>{developerDetail.contact_number}</Typography>
                        </Box>
                        <Box className="w-50">
                            <Typography className="sub_heading">Skype</Typography>
                            <Typography>{developerDetail.skype_id}</Typography>
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
                        <AddRoundedIcon onClick={() => {
                            setAddEducationDialogStatus(true)
                        }} className='circular_icon' />
                    </Box>
                    <Box className="d-flex column justify-content-between mt-2">
                        {developerDetail.education &&
                            developerDetail.education.map((data) => {
                                return <Box className="developer_education_box">
                                    <Box className="d-flex row">
                                        <Box className="d-flex column">
                                            <Typography className="developer_main_heading" variant="span">{data.school}</Typography>
                                            <Box className="d-flex column">
                                                <EditRoundedIcon onClick={() => {
                                                    setAddEducationDialogStatus(true)
                                                    setEducationDetail({
                                                        ...educationDetail,
                                                        school: data.school,
                                                        degree: data.degree,
                                                        studyIn: data.study_in,
                                                        description: data.description,
                                                        dateFrom: data.date_from,
                                                        dateTo: data.date_to,
                                                        id: data.id
                                                    });
                                                    ;
                                                }} className='circular_icon' />
                                                <Button className="circular_icon"><DeleteRoundedIcon className="circular_icon"
                                                    onClick={() => {
                                                        setDeleteEducationDialogStatus({ ...deleteEducationDialogStatus, status: true, id: data.id })
                                                    }}
                                                />
                                                </Button>
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
                        <AddRoundedIcon onClick={() => {
                            setAddExperienceDialogStatus(true);
                        }} className='circular_icon' />
                    </Box>
                    {developerDetail.experience && developerDetail.experience.map((data) => {
                        return <Box>
                            <Box className="experience_detail">
                                <Box className="d-flex row">
                                    <Typography className="h5" variant='span'>{data.title}| {data.company}</Typography>
                                    <Typography className='sub_heading' variant='span'>{data.working_from} - {data.working_to}</Typography>
                                </Box>
                                <Box className="d-flex column">
                                    <Button onClick={() => {
                                        setAddExperienceDialogStatus(true);
                                        setExperienceDetail({
                                            ...experienceDetail,
                                            id: data.id,
                                            title: data.title,
                                            company: data.company,
                                            country: { name: data.country_name, id: data.country_id },
                                            isWorking: data.isWorking,
                                            cityName: data.city_name,
                                            workingFrom: data.working_from,
                                            workgingTo: data.working_to,
                                            description: data.description
                                        })
                                    }}> <EditRoundedIcon className='circular_icon' />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setDeleteExperienceDialogStatus({ ...deleteExperienceDialogStatus, status: true, id: data.id })
                                        }}
                                    ><DeleteRoundedIcon className='circular_icon' />
                                    </Button>
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
                        <AddRoundedIcon onClick={() => {
                            setAddProjectDialogStatus({ ...addProjectDialogStatus, status: true });
                        }} className='circular_icon' />
                    </Box>
                    <Box className="d-flex row justify-content-between">
                        {developerDetail.projects && developerDetail.projects.map((data) => {
                            return <Card className="d-flex row" sx={{ maxWidth: "33%" }}>
                                <img
                                    onClick={() => {
                                        setProjectDetailDialogControl({ ...projectDetailDialogControl, status: true, id: data.id })
                                    }}
                                    src={data.project_image_url}
                                />
                                <Box className="d-flex">
                                    <Typography className="developer_main_heading m-2" variant="span">
                                        {data.title}
                                    </Typography>
                                    <EditRoundedIcon
                                        onClick={() => {
                                            setAddProjectDialogStatus({
                                                ...addProjectDialogStatus,
                                                status: true,
                                                id: data.id
                                            });
                                        }}
                                        className='circular_icon' />
                                    <DeleteRoundedIcon onClick={() => {
                                        setDeleteFreelancerProjectDialogControl({ ...deleteFreelancerProjectDialogControl, status: true, id: data.id });
                                    }} className='circular_icon' />
                                </Box>
                            </Card>
                        })}
                    </Box>
                </Box>
            </Box >

            <EditUserNameDialog editUserNameDialogControl={editUserNameDialogControl}
                setEditUserNameDialogControl={setEditUserNameDialogControl} handleClose={handleClose}
                handleEditUserName={handleEditUserName} />

            <EditHourlyRateDialog editHourlyRateDialogControl={editHourlyRateDialogControl}
                setEditHourlyRateDialogControl={setEditHourlyRateDialogControl}
                handleClose={handleClose} handleEditHourlyRate={handleEditHourlyRate} />

            <EditRoleAndOverviewDialog editRoleAndOverviewDialogControl={editRoleAndOverviewDialogControl} setEditRoleAndOverviewDialogControl={setEditRoleAndOverviewDialogControl} handleEditRoleAndOverviewDialog={handleEditRoleAndOverviewDialog} handleClose={handleClose} />

            {editSkillDialogControl.status && < EditSkillServiceDialog handleClose={handleClose} editSkillDialogControl={editSkillDialogControl} setEditSkillDialogControl={setEditSkillDialogControl} handleEditSkillDialog={handleEditSkillDialog} />}

            <EditProfileLinkDialog editProfileLinkDialogControl={editProfileLinkDialogControl} setEditProfileLinkDialogControl={setEditProfileLinkDialogControl}
                handleClose={handleClose} handleEditProfileLink={handleEditProfileLink} />

            <EditContactDialog editContactDialogControl={editContactDialogControl} setEditContactDialogControl={setEditContactDialogControl} handleClose={handleClose} handleEditContactDetail={handleEditContactDetail} />

            <AddEducationDialog addEducationDialogStatus={addEducationDialogStatus}
                handleClose={handleClose} educationDetail={educationDetail} setEducationDetail={setEducationDetail} handleAddEducationDetail={handleAddEducationDetail} />

            <DeleteEducationDialog deleteEducationDialogStatus={deleteEducationDialogStatus} handleClose={handleClose} handleDeleteEducation={handleDeleteEducation} />

            <AddExperienceDialog experienceDetail={experienceDetail} setExperienceDetail={setExperienceDetail} addExperienceDialogStatus={addExperienceDialogStatus} handleClose={handleClose} handleAddExperience={handleAddExperience} />

            <DeleteExperienceDialog deleteExperienceDialogStatus={deleteExperienceDialogStatus}
                handleClose={handleClose} handleDeleteExperience={handleDeleteExperience} />

            <AddProjectDialog addProjectDialogStatus={addProjectDialogStatus} setAddProjectDialogStatus={setAddProjectDialogStatus} handleDialogClose={handleClose} />

            <DeleteFreelancerProjectDialog deleteFreelancerProjectDialogControl={deleteFreelancerProjectDialogControl} handleDeleteFreelancerProject={handleDeleteFreelancerProject} handleClose={handleClose} />

            <ProjectDetailDialog projectDetailDialogControl={projectDetailDialogControl} handleClose={handleClose} />
        </>
    )
}

export default DeveloperProfile