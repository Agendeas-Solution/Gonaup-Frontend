import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Autocomplete, Box, Button, Input, InputLabel, TextField, Typography, createFilterOptions } from '@mui/material'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { handleApiCountryStateCityGetCall, request } from '../../utils/axios-utils'
import { useMutation } from 'react-query'
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookie from 'js-cookie'
import Uploader from '../Uploader/Uploader'
const theme = createTheme({
    palette: {
        secondary: {
            main: '#0971f1',
            darker: '#053e85',
        },
    },
});
const ClientProfileDetail = () => {
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
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <ThemeProvider theme={theme}>
                        <LinearProgress color="secondary" variant="determinate" {...props} />
                    </ThemeProvider>
                </Box>
            </Box>
        );
    }
    LinearProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };
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
    return (
        <>
            <Box className="main_section">
                <Typography className='main_section_heading'>7/7</Typography>
                <Typography className='main_section_heading'>Finalise Your Profile and Get Ready to Shine</Typography>
                <Typography className='main_section_description'>Taking the last steps towards showcasing your expertise and accessing exciting opportunities. Your safety and convenience are our top priorities, and our streamlined process ensures a hassle-free experience.</Typography>
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
                    <LinearProgressWithLabel value={10} />
                    <Button onClick={handleUpdateProfileDetail} className="save_button">Go to Dashboard</Button>
                </Box>
            </Box>
        </>
    )
}

export default ClientProfileDetail