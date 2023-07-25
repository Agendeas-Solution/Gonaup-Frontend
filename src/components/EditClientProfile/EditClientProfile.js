import React, { useState } from 'react'
import './index.css'
import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom';
import { PROJECT } from '../../constants/projectConstant';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
const EditClientProfile = () => {
    const { id } = useParams();
    const location = useLocation();
    const profileDetail = location.state;
    const [editProfileDetail, setEditProfileDetail] = useState(profileDetail);
    const { mutate: UpdateUserDetail } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleSaveUserDetail = () => {
        UpdateUserDetail({
            url: `/user/details`,
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                firstName: editProfileDetail.first_name,
                lastName: editProfileDetail.last_name,
                email: editProfileDetail.email
            }
        })
    }

    const { mutate: UpdateCompanyDetail } = useMutation(request, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateCompanyDetail = () => {
        UpdateCompanyDetail({
            url: `/company/details`,
            method: 'post',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                companyName: editProfileDetail?.companyDetails?.company_name,
                position: editProfileDetail?.companyDetails?.position,
                website: editProfileDetail?.companyDetails?.website,
                linkdinProfile: editProfileDetail?.companyDetails?.linkdin_profile,
                size: parseInt(editProfileDetail?.companyDetails?.size)
            }
        })
    }
    return (
        <>
            <Box className="edit_client_profile_main_section p-4">
                <Typography className='edit_profile_section_heading' variant='span'>Account</Typography>
                <Box className="d-flex justify-content-between column">
                    <Box sx={{ width: "15%" }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </Box>
                    <Box sx={{ width: "85%" }} className="d-flex justify-content-between row">
                        <Box className="d-flex justify-content-between row">
                            <TextField
                                onChange={(e) => {
                                    setEditProfileDetail({ ...editProfileDetail, first_name: e.target.value })
                                }}
                                value={editProfileDetail?.first_name}
                                variant="outlined"
                                label='First Name'
                                sx={{ width: "20%" }}
                            />
                            <TextField
                                onChange={(e) => {
                                    setEditProfileDetail({ ...editProfileDetail, last_name: e.target.value })
                                }}
                                value={editProfileDetail?.last_name}
                                variant="outlined"
                                label='Last Name'
                                sx={{ width: "20%" }}
                            />
                            <TextField
                                onChange={(e) => {
                                    setEditProfileDetail({ ...editProfileDetail, email: e.target.value })
                                }}
                                value={editProfileDetail?.email}
                                variant="outlined"
                                label='Email'
                                sx={{ width: "40%" }}
                            />
                        </Box>
                        <Box className="mt-2">
                            <Button onClick={
                                handleSaveUserDetail
                            }
                                variant='standard' className="save_button">Save</Button>
                            <Button variant='standard' className="cancel_button">Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <Box className="edit_client_profile_main_section p-4">
                <Typography className='edit_profile_section_heading' variant='span'>Company details</Typography>
                <Box className="d-flex justify-content-between column">
                    <Box sx={{ width: "15%" }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </Box>
                    <Box sx={{ width: "85%" }} className="d-flex justify-content-between row">
                        <Box className="d-flex justify-content-between column">
                            <TextField
                                onChange={(e) => {
                                    setEditProfileDetail(prevUserData => ({
                                        ...prevUserData,
                                        companyDetails: {
                                            ...prevUserData.companyDetails,
                                            company_name: e.target.value
                                        }
                                    }));
                                }}
                                value={editProfileDetail?.companyDetails?.company_name}
                                variant="outlined"
                                label='Company Name'
                                className="edit_profile_text_field"
                            />
                            <TextField
                                onChange={(e) => {
                                    setEditProfileDetail(prevUserData => ({
                                        ...prevUserData,
                                        companyDetails: {
                                            ...prevUserData.companyDetails,
                                            position: e.target.value
                                        }
                                    }));
                                }}
                                value={editProfileDetail?.companyDetails?.position}
                                variant="outlined"
                                label='Role in Company'
                                className="edit_profile_text_field"
                            />
                        </Box>
                        <Box className="d-flex justify-content-between column mt-2">
                            <TextField
                                onChange={(e) => {
                                    setEditProfileDetail(prevUserData => ({
                                        ...prevUserData,
                                        companyDetails: {
                                            ...prevUserData.companyDetails,
                                            website: e.target.value
                                        }
                                    }));
                                }}
                                value={editProfileDetail?.companyDetails?.website}
                                variant="outlined"
                                label='Website'
                                className="edit_profile_text_field"
                            />
                            <TextField
                                onChange={(e) => {
                                    setEditProfileDetail(prevUserData => ({
                                        ...prevUserData,
                                        companyDetails: {
                                            ...prevUserData.companyDetails,
                                            linkdin_profile: e.target.value
                                        }
                                    }));
                                }}
                                value={editProfileDetail?.companyDetails?.linkdin_profile}
                                variant="outlined"
                                label='Linkedin Profile'
                                className="edit_profile_text_field"
                            />
                        </Box>
                        <FormControl>
                            <FormLabel >How many people are in your company?</FormLabel>
                            <RadioGroup
                                onChange={(e) => {
                                    setEditProfileDetail(prevUserData => ({
                                        ...prevUserData,
                                        companyDetails: {
                                            ...prevUserData.companyDetails,
                                            size: e.target.value
                                        }
                                    }));
                                }}
                                value={editProfileDetail?.companyDetails?.size}
                            >
                                {PROJECT.COMPANY_SIZE.map((data) => {
                                    return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                                })}
                            </RadioGroup>
                        </FormControl>
                        <Box className="mt-2">
                            <Button onClick={handleUpdateCompanyDetail} variant='standard' className='save_button'>Save</Button>
                            <Button variant='standard' className="cancel_button">Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}
export default EditClientProfile