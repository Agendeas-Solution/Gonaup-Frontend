import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import './index.css'
import { request } from '../../utils/axios-utils'
import { useMutation } from 'react-query'
import Cookie from 'js-cookie'
import { PROJECT } from '../../constants/projectConstant'
import { useNavigate } from 'react-router-dom'
import HeaderLogo from '../HeaderLogo/HeaderLogo'
const CompanyDetail = () => {
    const navigate = useNavigate();
    const [companyDetail, setCompanyDetail] = useState({
        companyName: "",
        position: "",
        website: "",
        linkdinProfile: "",
        size: ""
    })
    // const { mutate: GetFreelancerStep } = useMutation(request, {
    //     onSuccess: (res) => {
    //     },
    //     onError: (err) => {
    //         console.log(err);
    //     }
    // });
    // const handleGetFreelancerStep = async (e) => {
    //     await GetFreelancerStep({
    //         url: '/user/freelancer/steps',
    //         method: 'get',
    //         headers: {
    //             Authorization: `${Cookie.get('userToken')}`,
    //         },
    //     })
    // }

    const { mutate: AddCompany } = useMutation(request, {
        onSuccess: (res) => {

        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleAddCompany = async (e) => {
        await AddCompany({
            url: '/company/details',
            method: 'post',
            data: companyDetail,
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    return (
        <>
            <Box >
                <HeaderLogo />
                <Box className="company_detail_section">
                    <Typography variant="span" className='main_section_heading'>Welcome to GonaUp!</Typography>
                    <Typography variant="span" className='main_section_description'>Tell us about your business and you'll be on your way to connect with talent.</Typography>
                    <Box className="company_detail_fields">
                        <Box sx={{ width: "45%" }}>
                            <TextField
                                className="company_detail_input_fields"
                                label="Company Name"
                                value={companyDetail?.companyName}
                                onChange={e => {
                                    setCompanyDetail({ ...companyDetail, companyName: e.target.value })
                                }}
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ width: "45%" }}>
                            <TextField
                                className="company_detail_input_fields"
                                label="Your LinkedIn Profile Link"
                                value={companyDetail?.linkdinProfile}
                                onChange={e => {
                                    setCompanyDetail({ ...companyDetail, linkdinProfile: e.target.value })
                                }}
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                    <Box className="company_detail_fields">
                        <Box sx={{ width: "45%" }}>
                            <TextField
                                className="company_detail_input_fields"
                                label="Your Role in company"
                                value={companyDetail?.position}
                                onChange={e => {
                                    setCompanyDetail({ ...companyDetail, position: e.target.value })
                                }}
                                variant="outlined"
                            />
                            <TextField
                                className="company_detail_input_fields mt-3"
                                label="Website link"
                                value={companyDetail?.website}
                                onChange={e => {
                                    setCompanyDetail({ ...companyDetail, website: e.target.value })
                                }}
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ width: "45%" }}>
                            <FormControl>
                                <FormLabel>How many people are in your company?</FormLabel>
                                <RadioGroup
                                    value={companyDetail.size}
                                    onChange={e => {
                                        setCompanyDetail({
                                            ...companyDetail,
                                            size: parseInt(e.target.value),
                                        })
                                    }}
                                >
                                    {PROJECT.COMPANY_SIZE.map((data) => {
                                        return < FormControlLabel value={data.id} control={< Radio />} label={data.type} />
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box className="d-flex justify-content-end mx-3 ">
                    <Button sx={{ width: "10%" }} className="common_button" variant="contained" onClick={handleAddCompany}>Next</Button>
                </Box>
            </Box >
        </>
    )
}

export default CompanyDetail