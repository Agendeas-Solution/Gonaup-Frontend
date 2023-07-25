import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import './index.css'
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const ClientProfile = () => {
    const [clientDetail, setClientDetail] = useState({})
    const navigate = useNavigate();
    const { mutate: GetClientDetail } = useMutation(request, {
        onSuccess: (res) => {
            setClientDetail(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetClientDetail = () => {
        GetClientDetail({
            url: `/user/profile`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetClientDetail();
    }, [])
    return (
        <>
            <Box className="client_profile_main_section">
                <Box className="d-flex justify-content-between p-4">
                    <Typography className="profile_section_heading" variant="span">Account</Typography>
                    <EditIcon className="circular_icon" onClick={() => {
                        navigate(`/editclientprofile/${clientDetail.id}`, { state: clientDetail })
                    }} />
                </Box>
                <Box className="d-flex row">
                    <Box className="d-flex column w-50 align-items-end p-3" >
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                        <Box className="d-flex row px-2">
                            <Typography variant='span' className="mb-2 profile_section_heading">
                                {clientDetail?.first_name} {clientDetail?.last_name}</Typography>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Job Role</Typography>
                                <Typography variant='span' className='profile_section_heading'>{clientDetail?.companyDetails?.position}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="d-flex column w-50 align-items-end p-3 ">
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Email</Typography>
                                <Typography variant='span' className='profile_section_heading'>
                                    {clientDetail?.email}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="client_profile_main_section">
                <Box className="d-flex justify-content-between p-4">
                    <Typography className="profile_section_heading" variant="span">Company details</Typography>
                    <EditIcon className="circular_icon" />
                </Box>
                <Box className="d-flex row">
                    <Box className="d-flex column w-50 align-items-end p-3" >
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Company Name</Typography>
                                <Typography variant='span' className='profile_section_heading'>
                                    {clientDetail?.companyDetails?.company_name}</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Company Size </Typography>
                                <Typography variant='span' className='profile_section_heading'>
                                    {clientDetail?.companyDetails?.size}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="d-flex column w-50 align-items-end p-3 ">
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Website</Typography>
                                <Typography variant='span' className='profile_section_heading'>
                                    {clientDetail?.companyDetails?.website}</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>LinkedIn</Typography>
                                <Typography variant='span' className='profile_section_heading'>{
                                    clientDetail?.companyDetails?.linkdin_profile
                                }</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="client_profile_main_section">
                <Box className="d-flex justify-content-between p-4">
                    <Typography className="profile_section_heading" variant="span">Company contacts</Typography>
                    <EditIcon className="circular_icon" />
                </Box>
                <Box className="d-flex row">
                    <Box className="d-flex column w-50 align-items-end p-3" >
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Phone</Typography>
                                <Typography variant='span' className='profile_section_heading'>
                                    {clientDetail?.contact_number}</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Country </Typography>
                                <Typography variant='span' className='profile_section_heading'>
                                    {clientDetail?.country_name}</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>State </Typography>
                                <Typography variant='span' className='profile_section_heading'>{clientDetail?.state_name}</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Address </Typography>
                                <Typography variant='span' className='profile_section_heading'>{
                                    clientDetail?.address
                                }</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="d-flex column w-50 align-items-end p-3 ">
                        <Box className="d-flex row px-2">
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Skype</Typography>
                                <Typography variant='span' className='profile_section_heading'>{
                                    clientDetail?.skype_id
                                }</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>City</Typography>
                                <Typography variant='span' className='profile_section_heading'>{clientDetail?.city_name}</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Typography variant='span' sx={{ color: "#8E8E8E" }}>Zip/Postal Code</Typography>
                                <Typography variant='span' className='profile_section_heading'>{clientDetail?.zip_code}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ClientProfile