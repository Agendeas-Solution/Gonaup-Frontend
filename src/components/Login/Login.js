import React, { useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    InputLabel,
    Divider,
} from '@mui/material'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { request } from '../../utils/axios-utils'
import { useMutation } from 'react-query'
import { setLoginToken, setUserType } from '../../hooks/storage'
import { Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { PERMISSION } from '../../constants/permissionConstant'
import HeaderLogo from '../HeaderLogo/HeaderLogo'
const Login = () => {
    const [userDetail, setUserDetail] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const handleLoginRoute = (loginStep) => {
        const storedData = localStorage.getItem('loginDetail');
        const loginDetail = JSON.parse(storedData);
        if (loginDetail?.usedDetails?.signupCompleted == 1) {
            if (loginDetail?.usedDetails?.type == 0 || loginDetail?.usedDetails?.hasCompany) {
                navigate("/homepage")
            }
            else if (!loginDetail?.usedDetails?.hasCompany) {
                navigate("/companydetail")
            }
        }
        else if (loginDetail?.usedDetails?.type == 0) {
            navigate(PERMISSION.DEVELOPER_PERMISSION_ROUTE[loginStep.stepStatus - 1].path)
        }
        else if (loginDetail?.usedDetails?.type == 1 && loginDetail?.usedDetails?.hasCompany) {
            navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[loginStep.stepStatus - 1].path)
        }
        else if (loginDetail?.usedDetails?.type == 1) {
            navigate("/companydetail")
        }
        else if (loginDetail?.usedDetails?.type == 2 && loginDetail?.usedDetails?.hasCompany) {
            navigate(PERMISSION.CLIENT_PERMISSION_ROUTE[loginStep.stepStatus - 1].path)
        }
        else if (loginDetail?.usedDetails?.type == 2) {
            navigate("/companydetail")
        }
    }
    const { mutate: Login } = useMutation(request, {
        onSuccess: (res) => {
            setLoginToken(res.data.data.token)
            localStorage.setItem('type', res?.data?.data?.usedDetails?.type)
            setUserType(res?.data?.data?.usedDetails?.type)
            localStorage.setItem('signupCompleted', res?.data?.data?.usedDetails?.signupCompleted)
            const dataToStore = JSON.stringify(res?.data?.data);
            localStorage.setItem('loginDetail', dataToStore);
            if (res?.data?.data?.usedDetails?.type == 0 || res?.data?.data?.usedDetails?.type == 1) {
                handleGetAccountList();
            }
            if (res?.data?.data?.usedDetails?.signupCompleted == 0) {
                handleGetFreelancerSteps()
            }
            else {
                handleLoginRoute();
            }
        },
        onError: (err) => {
        }
    });
    const { mutate: GetAccountList } = useMutation(request, {
        onSuccess: (res) => {
            const dataToStore = JSON.stringify(res?.data?.data);
            localStorage.setItem('accountList', dataToStore);
        },
        onError: (err) => {
        }
    });
    const handleGetAccountList = async (e) => {
        await GetAccountList({
            url: '/auth/accounts',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const { mutate: GetFreelancerSteps } = useMutation(request, {
        onSuccess: (res) => {
            localStorage.setItem('stepStatus', res?.data?.data?.stepStatus - 1);
            handleLoginRoute(res.data.data);
        },
        onError: (err) => {
        }
    });
    const handleGetFreelancerSteps = async () => {
        await GetFreelancerSteps({
            url: '/user/freelancer/steps',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const handleLogin = async (e) => {
        await Login({
            url: '/auth/login',
            method: 'post',
            data: userDetail,
        })
    };
    const [showPassword, setShowPassword] = useState(true)
    const handleClickShowPassword = () => setShowPassword(show => !show)
    const handleMouseDownPassword = event => {
        event.preventDefault()
    }
    return (
        <>
            <Box className="login_page">
                <HeaderLogo />
                <Box className="login_form_section">
                    <Box className="login_form_body">
                        <Box className="login_form_box">
                            <Typography className="login_heading" variant="span">
                                Login To Gonaup
                            </Typography>
                            <form
                                onSubmit={e => {
                                    e.preventDefault()
                                    handleLogin()
                                }}
                            >
                                <Box sx={{ width: '100%', padding: '30px 20px 20px 20px' }}>
                                    <InputLabel>Email</InputLabel>
                                    <TextField
                                        placeholder="Email"
                                        id="my-text-field"
                                        sx={{ width: '100%' }}
                                        type="email"
                                        value={userDetail.email}
                                        variant="outlined"
                                        onChange={e => {
                                            setUserDetail({ ...userDetail, email: e.target.value })
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                                <Box sx={{ width: '100%', padding: '20px 20px 0px 20px' }}>
                                    <InputLabel>Password</InputLabel>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        placeholder="Password"
                                        type={showPassword ? 'password' : 'text'}
                                        value={userDetail.password}
                                        onChange={e => {
                                            setUserDetail({ ...userDetail, password: e.target.value })
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            margin: '0px',
                                                            color: '#2E3591',
                                                            boxShadow: 'none',
                                                        }}
                                                        variant="contained"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                                <Box sx={{ width: '100%', padding: '3px 20px 0px 20px' }}>
                                    <Typography
                                        className="login_forget_password_root"
                                        variant="span"
                                    >
                                        <Link
                                            component="button"
                                            variant="body2"
                                            onClick={() => {
                                                navigate('/forgotpassword')
                                            }}
                                        >
                                            Forgotten password ?
                                        </Link>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                        padding: '20px 20px 5px 20px',
                                    }}
                                >
                                    <Button
                                        className="common_button"
                                        onClick={handleLogin}
                                        sx={{ width: "80%" }}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                            <Divider className="mt-3">
                                Don’t have an GonaUp Account?
                            </Divider>
                            <Button
                                onClick={() => navigate("/join")}
                                sx={{ width: "60%" }} className="sign_up_button" variant="standard">Sign Up</Button>
                        </Box>
                    </Box>
                    <Box className="login_footer">
                        <Typography className="login_copyright_root" variant="span">
                            {new Date().getFullYear()} © Gonaup.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Login
