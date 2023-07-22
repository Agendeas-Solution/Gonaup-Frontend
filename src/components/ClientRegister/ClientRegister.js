import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, Radio, Autocomplete, createFilterOptions } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { REGISTER } from '../../constants/registerConstant'
// import './index.css'
import { useMutation } from 'react-query'
import { request, handleApiCountryStateCityGetCall } from '../../utils/axios-utils'
import { Link, useNavigate } from 'react-router-dom'
const ClientRegister = () => {
    const [values, setValues] = useState({
        email: '',
        showPassword: false,
    })
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [cityList, setCityList] = useState([])
    const [stateList, setStateList] = useState([])
    const [countryList, setCountryList] = useState([])
    const [otpValue, setOtpValue] = useState({
        value: null,
        emailVerifyStatus: false,
        otpVerifyStatus: false,
    })
    const { mutate } = useMutation(request);
    const handleRegister = async (e) => {
        let data = {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: registerData.password,
        }
        debugger
        await mutate({
            url: '/auth/freelancer/signup',
            method: 'post',
            data: data,
            onSuccess: (response, variables) => {
                console.log(variables);
                navigate('/login')
            },
            onError: (response) => {
                console.log(response);
            }
        })
    };
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option?.name,
    })
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }
    const handleMouseDownPassword = event => {
        event.preventDefault()
    }
    const handleSentOtp = () => {
        // SentOtp(
        //     { email: registerData?.email },
        //     res => {
        //         if (res.success) {
        //             setOtpValue({
        //                 ...otpValue,
        //                 emailVerifyStatus: true,
        //             })
        //             // setSuccessSnackbar({
        //             //     ...successSnackbar,
        //             //     message: res?.message,
        //             //     status: true,
        //             // })
        //         }
        //     },
        //     err => {
        //         // setErrorSnackbar({
        //         //     ...errorSnackbar,
        //         //     status: true,
        //         //     message: err?.response?.data?.message,
        //         // })
        //     },
        // )
    }
    const handleOtp = () => {
        // VerifyOTP(
        //     { email: registerData?.email, otp: otpValue.value },
        //     res => {
        //         setOtpValue({
        //             ...otpValue,
        //             otpVerifyStatus: true,
        //         })
        //         // setSuccessSnackbar({
        //         //     ...successSnackbar,
        //         //     message: res?.message,
        //         //     status: true,
        //         // })
        //     },
        //     err => {
        //         // setErrorSnackbar({
        //         //     ...errorSnackbar,
        //         //     status: true,
        //         //     message: err?.response?.data?.message,
        //         // })
        //     },
        // )
    }
    return (
        <>
            <Box className="register_page">
                <Box className="register_section">
                    <Box className="register_form_body">
                        <Box className="register_form_box">
                            <Box className="heading_section">
                                <Typography className="main_heading" variant="span">
                                    Sign Up to Unlock New Opportunities
                                </Typography>
                            </Box>
                            <Box className="register_name_fields">
                                <Box>
                                    <InputLabel>First Name</InputLabel>
                                    <TextField
                                        className="register_input_fields"
                                        placeholder="First Name"
                                        value={registerData?.firstName
                                        }
                                        onChange={e => {
                                            setRegisterData({ ...registerData, firstName: e.target.value })
                                        }}
                                        variant="outlined"
                                    />
                                </Box>
                                <Box>
                                    <InputLabel>Last Name</InputLabel>
                                    <TextField
                                        className="register_input_fields"
                                        placeholder="Last Name"
                                        value={registerData?.lastName}
                                        onChange={e => {
                                            setRegisterData({ ...registerData, lastName: e.target.value })
                                        }}
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>
                            <Box className="register_page_fields">
                                <InputLabel>Email</InputLabel>
                                <TextField
                                    sx={{ width: "100%" }}
                                    type={'email'}
                                    placeholder="Email"
                                    value={registerData?.email}
                                    onChange={e => {
                                        setRegisterData({ ...registerData, email: e.target.value })
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button
                                                    sx={{
                                                        margin: '0px',
                                                        backgroundColor: '#7ac144',
                                                        boxShadow: 'none',
                                                    }}
                                                    variant="contained"
                                                    onClick={handleSentOtp}
                                                >
                                                    Send Otp
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box className="register_page_fields">
                                <Box>
                                    <InputLabel>Password</InputLabel>
                                    <TextField
                                        // className="register_input_fields"
                                        sx={{ width: "100%" }}
                                        label="Password (8 or More characters)"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={registerData?.password}
                                        onChange={e => {
                                            setRegisterData({
                                                ...registerData,
                                                password: e.target.value,
                                            })
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            margin: '0px',
                                                            color: '#7ac144',
                                                            boxShadow: 'none',
                                                        }}
                                                        variant="contained"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </Box>
                            {/* <Box className="register_page_fields">
                                <TextField
                                    className="register_input_fields"
                                    label="Freelance Profile"
                                    placeholder="Freelance Profile"
                                    value={registerData?.freelanceProfile
                                    }
                                    onChange={e => {
                                        setRegisterData({ ...registerData, freelanceProfile: e.target.value })
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    className="register_input_fields"
                                    label="Linkedin Profile"
                                    placeholder="Linkedin Profile"
                                    value={registerData?.linkedinProfile}
                                    onChange={e => {
                                        setRegisterData({ ...registerData, linkedinProfile: e.target.value })
                                    }}
                                    variant="outlined"
                                />
                            </Box> */}
                            {/* <Box className="register_page_fields">
                                <TextField
                                    className="register_input_fields"
                                    label="Contact No"
                                    placeholder="ContactNo"
                                    type="number"
                                    value={registerData?.contact_number}
                                    onChange={e => {
                                        setRegisterData({
                                            ...registerData,
                                            contact_number: e.target.value,
                                        })
                                    }}
                                    variant="outlined"
                                />
                            </Box> */}
                            <FormGroup sx={{ marginTop: '10px' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{ color: '#2E3591' }}
                                            className="check_box_color"
                                            defaultChecked
                                        />
                                    }
                                    label="Yes, I understand and agree to the Upwork Terms of Service,
                                    including the User Agreement and Privacy Policy."
                                />
                            </FormGroup>
                            <Button
                                onClick={handleRegister}
                                variant="contained"
                                className='register_button'
                            >
                                Create Account
                            </Button>
                            <Typography>Already have an account?
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        navigate('/login')
                                    }}
                                >
                                    Log In
                                </Link>
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Box >
        </>
    )
}

export default ClientRegister
