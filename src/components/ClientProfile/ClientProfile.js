import React, { useEffect, useState } from 'react'
import { Autocomplete, Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, TextField, Typography, createFilterOptions } from '@mui/material'
import './index.css'
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from 'react-query';
import { handleApiCountryStateCityGetCall, request } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { PROJECT } from '../../constants/projectConstant';
import Uploader from '../Uploader/Uploader';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
const ClientProfile = () => {
    const [clientDetail, setClientDetail] = useState({})
    const navigate = useNavigate();
    const [editClientPersonalDetail, setEditClientPersonalDetail] = useState(false)
    const [editCompanyDetail, seteditCompanyDetail] = useState(false)
    const [editCompanyContactDetail, seteditCompanyContactDetail] = useState(false)
    const [profileDetail, setProfileDetail] = useState({
        pincode: '',
        city: null,
        state: null,
        country: null,
        address: null,
        phoneno: null,
        skypeId: null,
    });
    const [imageUrl, setImageUrl] = useState();
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const { mutate: GetCountry } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setCountryList(res.data)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const { mutate: GetState } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setStateList(res.data)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const { mutate: GetCity } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setCityList(res.data)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const handleGetStateCall = async (data) => {
        await GetState({
            url: `/countries/${data}/states`,
            method: 'get',
            data: {},
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    const handleGetCityCall = async (data) => {
        await GetCity({
            url: `/countries/` + data,
            method: 'get',
            data: {},
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    useEffect(() => {
        let data = profileDetail?.country?.iso2
        profileDetail?.country && handleGetStateCall(data);
    }, [profileDetail?.country]);
    useEffect(() => {
        let data = profileDetail?.state?.iso2
            ? `${profileDetail?.country?.iso2}/states/${profileDetail?.state?.iso2}/cities`
            : ''
        profileDetail?.state && handleGetCityCall(data);
    }, [profileDetail?.state])
    useEffect(() => {
        handleGetCountryCall();
    }, [])
    const { mutate: UpdateProfileDetail } = useMutation(request, {
        onSuccess: (response) => {
            console.log(response);

        },
        onError: (response) => {
            console.log(response);
        }
    });
    const handleUpdateProfileDetail = async (e) => {
        const formData = new FormData()
        console.log(profileDetail);
        ;
        formData.append('contactNumber', profileDetail.phoneno)
        formData.append('skypeId', profileDetail.skypeId)
        formData.append('address', profileDetail.address)
        formData.append('countryId', profileDetail.country.id)
        formData.append('countryCode', profileDetail.country.iso2)
        formData.append('countryName', profileDetail.country.name)
        formData.append('stateId', profileDetail.state.id)
        formData.append('stateCode', profileDetail.state.iso2)
        formData.append('stateName', profileDetail.state.name)
        formData.append('cityId', profileDetail.city.id)
        formData.append('cityName', profileDetail.city.name)
        formData.append('zipCode', profileDetail.pincode)
        formData.append('profile_image', imageUrl)
        await UpdateProfileDetail({
            url: '/user/freelancer/contact-details',
            method: 'put',
            data: formData,
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option?.name,
    })
    const handleGetCountryCall = async (e) => {
        await GetCountry({
            url: '/countries',
            method: 'get',
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    useEffect(() => {
        handleGetCountryCall();
    }, [])
    const { mutate: GetClientDetail } = useMutation(request, {
        onSuccess: (res) => {
            let client = res.data.data
            setClientDetail(res.data.data)
            setProfileDetail({
                ...profileDetail,
                pincode: client.zip_code,
                city: { name: client.city_name, id: client.city_id },
                state: { name: client.state_name, id: client.state_id, iso2: client.state_code },
                country: { name: client.country_name, id: client.country_id, iso2: client.country_code },
                address: client.address,
                phoneno: client.contact_number,
                skypeId: client.skype_id,
            })
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
    const { mutate: UpdateUserDetail } = useMutation(request, {
        onSuccess: (res) => {
            handleEditClientPersonalDetailStatus();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleEditClientPersonalDetailStatus = () => {
        setEditClientPersonalDetail(!editClientPersonalDetail)
    }

    const handleEditCompanyDetailStatus = () => {
        seteditCompanyDetail(!editCompanyDetail)
    }
    const handleEditCompanyContactDetail = () => {
        seteditCompanyContactDetail(!editCompanyContactDetail)
    }
    const handleSaveUserDetail = () => {
        UpdateUserDetail({
            url: `/user/details`,
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                firstName: clientDetail.first_name,
                lastName: clientDetail.last_name,
                email: clientDetail.email
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
                companyName: clientDetail?.companyDetails?.company_name,
                position: clientDetail?.companyDetails?.position,
                website: clientDetail?.companyDetails?.website,
                linkdinProfile: clientDetail?.companyDetails?.linkdin_profile,
                size: parseInt(clientDetail?.companyDetails?.size)
            }
        })
    }
    return (
        <>
            {editClientPersonalDetail ?
                <Box className="client_profile_main_section p-4">
                    <Typography className='edit_profile_section_heading' variant='span'>Account</Typography>
                    <Box className="d-flex justify-content-between column" >
                        <Box sx={{ width: "15%" }}>
                            <Avatar
                                alt="Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 56, height: 56 }}
                            />
                        </Box>
                        <Box sx={{ width: "85%" }} className="d-flex justify-content-between row">
                            <Box className="d-flex justify-content-between row">
                                <TextField
                                    onChange={(e) => {
                                        setClientDetail({ ...clientDetail, first_name: e.target.value })
                                    }}
                                    value={clientDetail?.first_name}
                                    variant="outlined"
                                    label='First Name'
                                    sx={{ width: "20%" }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setClientDetail({ ...clientDetail, last_name: e.target.value })
                                    }}
                                    value={clientDetail?.last_name}
                                    variant="outlined"
                                    label='Last Name'
                                    sx={{ width: "20%" }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setClientDetail({ ...clientDetail, email: e.target.value })
                                    }}
                                    value={clientDetail?.email}
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
                                <Button onClick={handleEditClientPersonalDetailStatus} variant='standard' className="cancel_button">Cancel</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                : <Box className="client_profile_main_section">
                    <Box className="d-flex justify-content-between p-4">
                        <Typography className="profile_section_heading" variant="span">Account</Typography>
                        <EditIcon className="circular_icon" onClick={
                            handleEditClientPersonalDetailStatus
                        } />
                    </Box>
                    <Box className="d-flex row">
                        <Box className="d-flex column w-50 align-items-end p-3" >
                            <Avatar
                                alt="Sharp"
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
            }

            {editCompanyDetail ?
                <Box className="client_profile_main_section p-4">
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
                                        setClientDetail(prevUserData => ({
                                            ...prevUserData,
                                            companyDetails: {
                                                ...prevUserData.companyDetails,
                                                company_name: e.target.value
                                            }
                                        }));
                                    }}
                                    value={clientDetail?.companyDetails?.company_name}
                                    variant="outlined"
                                    label='Company Name'
                                    className="edit_profile_text_field"
                                />
                                <TextField
                                    onChange={(e) => {
                                        setClientDetail(prevUserData => ({
                                            ...prevUserData,
                                            companyDetails: {
                                                ...prevUserData.companyDetails,
                                                position: e.target.value
                                            }
                                        }));
                                    }}
                                    value={clientDetail?.companyDetails?.position}
                                    variant="outlined"
                                    label='Role in Company'
                                    className="edit_profile_text_field"
                                />
                            </Box>
                            <Box className="d-flex justify-content-between column mt-2">
                                <TextField
                                    onChange={(e) => {
                                        setClientDetail(prevUserData => ({
                                            ...prevUserData,
                                            companyDetails: {
                                                ...prevUserData.companyDetails,
                                                website: e.target.value
                                            }
                                        }));
                                    }}
                                    value={clientDetail?.companyDetails?.website}
                                    variant="outlined"
                                    label='Website'
                                    className="edit_profile_text_field"
                                />
                                <TextField
                                    onChange={(e) => {
                                        setClientDetail(prevUserData => ({
                                            ...prevUserData,
                                            companyDetails: {
                                                ...prevUserData.companyDetails,
                                                linkdin_profile: e.target.value
                                            }
                                        }));
                                    }}
                                    value={clientDetail?.companyDetails?.linkdin_profile}
                                    variant="outlined"
                                    label='Linkedin Profile'
                                    className="edit_profile_text_field"
                                />
                            </Box>
                            <FormControl>
                                <FormLabel >How many people are in your company?</FormLabel>
                                <RadioGroup
                                    onChange={(e) => {
                                        setClientDetail(prevUserData => ({
                                            ...prevUserData,
                                            companyDetails: {
                                                ...prevUserData.companyDetails,
                                                size: e.target.value
                                            }
                                        }));
                                    }}
                                    value={clientDetail?.companyDetails?.size}
                                >
                                    {PROJECT.COMPANY_SIZE.map((data) => {
                                        return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <Box className="mt-2">
                                <Button onClick={handleUpdateCompanyDetail} variant='standard' className='save_button'>Save</Button>
                                <Button onClick={handleEditCompanyDetailStatus} variant='standard' className="cancel_button">Cancel</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box> :
                <Box className="client_profile_main_section">
                    <Box className="d-flex justify-content-between p-4">
                        <Typography className="profile_section_heading" variant="span">Company details</Typography>
                        <EditIcon onClick={handleEditCompanyDetailStatus} className="circular_icon" />
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
                                    <Typography variant='span' className='profile_section_heading'>
                                        {clientDetail?.companyDetails?.linkdin_profile}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            {editCompanyContactDetail ? <Box className="client_profile_main_section">
                <Box>
                    <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    <Typography>Phone</Typography>
                    <PhoneInput
                        placeholder="Enter Mobile No"
                        value={profileDetail.phoneno}
                        defaultCountry="US"
                        sx={{ width: "100px" }}
                        onChange={(event) => {
                            setProfileDetail({ ...profileDetail, phoneno: event })
                        }} />
                </Box>
                <Box>
                    <InputLabel>Skype id</InputLabel>
                    <TextField
                        placeholder="Skype Id"
                        type="text"
                        value={profileDetail.skypeId}
                        onChange={(e) => {
                            setProfileDetail({ ...profileDetail, skypeId: e.target.value })
                        }}
                    />
                </Box>
                <Box>
                    <Autocomplete
                        className="input_fields"
                        disablePortal
                        disableClearable
                        options={countryList}
                        value={profileDetail?.country}
                        onChange={(e, value) => {
                            setProfileDetail({ ...profileDetail, country: value })
                        }}
                        getOptionLabel={option => option?.name}
                        renderInput={params => (
                            <TextField {...params} label="Select Country" />
                        )}
                    />
                    <Autocomplete
                        className="input_fields"
                        options={stateList}
                        disableClearable
                        disabled={!profileDetail?.country}
                        filterOptions={filterOptions}
                        value={profileDetail?.state}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => {
                            setProfileDetail({ ...profileDetail, state: value })
                        }}
                        renderInput={params => (
                            <TextField {...params} label=" Select State" />
                        )}
                    />
                    <Autocomplete
                        className="input_fields"
                        options={cityList}
                        disableClearable
                        disabled={!profileDetail?.state}
                        filterOptions={filterOptions}
                        value={profileDetail?.city}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => {
                            setProfileDetail({ ...profileDetail, city: value })
                        }}
                        renderInput={params => (
                            <TextField {...params} label="Select City" />
                        )}
                    />
                </Box>
                <Box>
                    <InputLabel>Street Address</InputLabel>
                    <TextField
                        placeholder="Street Address"
                        type="text"
                        value={profileDetail.address}
                        onChange={(e) => {
                            setProfileDetail({ ...profileDetail, address: e.target.value })
                        }}
                    />
                </Box>
                <Box>
                    <InputLabel>Pincode</InputLabel>
                    <TextField
                        placeholder="Pincode/Zip Code"
                        type="text"
                        value={profileDetail.pincode}
                        onChange={(e) => {
                            setProfileDetail({ ...profileDetail, pincode: e.target.value })
                        }}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Button onClick={handleUpdateProfileDetail} className="save_button">Save</Button>
                    <Button onClick={handleEditCompanyContactDetail} className="cancel_button">Cancel</Button>
                </Box>
            </Box> : <Box className="client_profile_main_section">
                <Box className="d-flex justify-content-between p-4">
                    <Typography className="profile_section_heading" variant="span">Company contacts</Typography>
                    <EditIcon onClick={handleEditCompanyContactDetail} className="circular_icon" />
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
            </Box>}
        </>
    )
}

export default ClientProfile