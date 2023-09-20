import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Divider, Menu, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import Logo from '../../assets/images/logo.svg'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { clearLoginToken, setLoginToken } from '../../hooks/storage'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { request } from '../../utils/axios-utils'
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
const Header = () => {
    const navigate = useNavigate()
    let accountList = []
    let storedData = ''
    const [anchorEl, setAnchorEl] = useState(null);
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    if (Cookie.get('userToken')) {
        storedData = localStorage.getItem('accountList');
        accountList = JSON.parse(storedData);
    }
    const tabStyles = {
        textTransform: 'capitalize',
        textDecoration: 'none',
        fontWeight: '500',
        fontFamily: "Poppins",
        '&.Mui-selected': {
            color: '#7AC144',
        },
    };
    const { mutate: GetAccountList } = useMutation(request, {
        onSuccess: (res) => {
            const dataToStore = JSON.stringify(res?.data?.data);
            localStorage.setItem('accountList', dataToStore);
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
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
    const { mutate: SwitchAccount } = useMutation(request, {
        onSuccess: (res) => {
            setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.data.message,
            })
            localStorage.setItem('type', res?.data?.data?.type)
            setLoginToken(res.data.data.token)
            handleGetAccountList();
            if (res?.data?.data?.type == 0) {
                navigate('/homepage')
            }
            else if (res?.data?.data?.type == 1) {
                navigate('/homepage')
            }
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleSwitchAccount = async () => {
        const mainFalseData = accountList.find(data => data.main === false);
        const desiredValue = mainFalseData ? mainFalseData.type : null;
        await SwitchAccount({
            url: '/auth/switch-account',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                type: desiredValue
            }
        })
    }
    return (
        <>

            <Box className="company_logo">
                <Box className="d-flex column align-items-center justify-content-start w-50">
                    <img src={Logo} alt="Company logo" />
                    {Cookie.get('userToken') && <TabContext value={value}>
                        <Box>
                            <TabList sx={{ background: "#fff !important" }} onChange={handleChange} >
                                <Tab
                                    sx={tabStyles}
                                    onClick={() => {
                                        navigate('/homepage');
                                    }}
                                    label="My Jobs" value="1" />
                                <Tab
                                    sx={tabStyles}
                                    onClick={() => {
                                        localStorage.getItem('type') == 0 && navigate('/developerprofile');
                                        localStorage.getItem('type') == 1 && navigate('/clientprofile');
                                        localStorage.getItem('type') == 2 && navigate('/clientprofile');
                                    }}
                                    label="My Profile" value="2" />
                            </TabList>
                        </Box>
                    </TabContext>}
                </Box>
                <Box className="d-flex column align-items-center justify-content-end w-50">
                    {Cookie.get('userToken') &&
                        <>
                            <NotificationsNoneRoundedIcon className='mx-2' sx={{ color: "#7AC144" }} onClick={() => {
                                navigate('/notification')
                            }} />
                            <Divider />
                            <Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem >{accountList && accountList.map((data) => {
                                        if (data.main) {
                                            return <>
                                                <Box className="user_profession_detail">
                                                    <Avatar onClick={handleClick} alt="Remy Sharp" src={data.imageUrl} />
                                                    <Typography variant="span">{data.fullName} </Typography>
                                                    <Typography variant="span">{data.type === 0 ? "Freelancer" : "Client"} </Typography>
                                                </Box>
                                            </>
                                        }
                                    })}</MenuItem>
                                    <MenuItem >{accountList && accountList.map((data) => {
                                        if (!data.main) {
                                            return <>
                                                <Box onClick={handleSwitchAccount}>
                                                    <AccountCircleRoundedIcon />
                                                    <Box className="d-flex row">
                                                        <Typography variant="span">{data.fullName} </Typography>
                                                        <Typography variant="span">{data.type == 0 ? "Freelancer" : "Client"} </Typography>
                                                    </Box>
                                                </Box>
                                            </>
                                        }
                                    })}</MenuItem>
                                    {localStorage.getItem('type') == 0 && <MenuItem onClick={() => {
                                        navigate("/developersetting")
                                        handleClose();
                                    }} >{accountList && accountList.map((data) => {
                                        if (data.main && data.type == 0) {
                                            return <>
                                                <SettingsRoundedIcon />
                                                <Typography variant="span">Settings</Typography>
                                            </>
                                        }
                                    })}</MenuItem>}
                                    <MenuItem onClick={clearLoginToken}><LogoutRoundedIcon />Logout</MenuItem>
                                </Menu>
                            </Box>
                            {accountList && accountList.map((data) => {
                                if (data.main) {
                                    return <>
                                        <Box className="user_profession_detail">
                                            <Avatar onClick={handleClick} alt="Remy Sharp" src={data.imageUrl} />
                                        </Box>
                                    </>
                                }
                            })}
                        </>
                    }
                </Box>
            </Box>
        </>
    )
}

export default Header
