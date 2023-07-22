import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Autocomplete, Box, Input, InputLabel, TextField, Typography, createFilterOptions } from '@mui/material'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { handleApiCountryStateCityGetCall } from '../../utils/axios-utils'
import { useMutation } from 'react-query'
import Uploader from '../Uploader/Uploader'
import './index.css'
const ClientDetails = () => {
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
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option?.name,
    })
    const handleGetCountryCall = async (e) => {
        await GetCountry({
            url: '/countries',
            method: 'get',
            data: {},
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    useEffect(() => {
        handleGetCountryCall();
    }, [])
    return (
        <>
            <Box className="main_section">
                <Typography className='main_section_heading'>Finalise Your Profile and Get Ready to Shine</Typography>
                <Typography className='main_section_description'>Taking the last steps towards showcasing your expertise and accessing exciting opportunities. Your safety and convenience are our top priorities, and our streamlined process ensures a hassle-free experience.</Typography>
                <Box className="d-flex column w-100">
                    <Box className="client_detail_left_section">
                        <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    </Box>
                    <Box className="client_detail_right_section">
                        <Box className="d-flex column w-100 justify-content-between mb-3">
                            <Box className="client_text_field_left_section">
                                <Typography>Phone</Typography>
                                <PhoneInput
                                    placeholder="Enter Mobile No"
                                    value={profileDetail.phoneno}
                                    defaultCountry="US"
                                    sx={{ width: "100px" }}
                                    onChange={(e) => {
                                        setProfileDetail({ ...profileDetail, phoneno: e.target.value })
                                    }} />
                            </Box>
                            <Box className="client_text_field_right_section">
                                <TextField
                                    placeholder="Skype Id"
                                    type="text"
                                    className='w-100'
                                    value={profileDetail.skypeId}
                                    onChange={(e) => {
                                        setProfileDetail({ ...profileDetail, skypeId: e.target.value })
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Box className="d-flex column w-100 justify-content-between">
                                <Box className="client_text_field_left_section">
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
                                            <TextField {...params} placeholder="Select Country" />
                                        )}
                                    />
                                </Box>
                                <Box className="client_text_field_right_section">
                                    <TextField
                                        className='w-100'
                                        placeholder="Street Address"
                                        type="text"
                                        value={profileDetail.address}
                                        onChange={(e) => {
                                            setProfileDetail({ ...profileDetail, address: e.target.value })
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="d-flex column w-100 justify-content-between mt-3">
                            <Autocomplete
                                className="w-25"
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
                                className="w-25"
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
                            <TextField
                                placeholder="Pincode/Zip Code"
                                type="text"
                                className='w-25'
                                value={profileDetail.pincode}
                                onChange={(e) => {
                                    setProfileDetail({ ...profileDetail, pincode: e.target.value })
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ClientDetails