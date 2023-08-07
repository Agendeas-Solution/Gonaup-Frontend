import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Divider, Menu, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import Logo from '../../assets/images/logo.svg'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { clearLoginToken } from '../../hooks/storage'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
const Header = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
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
    const storedData = localStorage.getItem('accountList');
    const accountList = JSON.parse(storedData);
    return (
        <>
            <Box className="company_logo">
                <img src={Logo} alt="Company logo" />
                {accountList && accountList.map((data) => {
                    if (data.main) {
                        return <>
                            <Box className="user_profession_detail">
                                <Avatar onClick={handleClick} alt="Remy Sharp" src={data.imageUrl} />
                            </Box>
                        </>
                    }
                })}
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} >
                            <Tab
                                onClick={() => {
                                    localStorage.getItem('type') == 0 && navigate('/developerhomepage');
                                    localStorage.getItem('type') == 1 && navigate('/clienthomepage');
                                    localStorage.getItem('type') == 2 && navigate('/recruiterhomepage');
                                }}
                                label="My Jobs" value="1" />
                            <Tab
                                onClick={() => {
                                    localStorage.getItem('type') == 0 && navigate('/developerprofile');
                                    localStorage.getItem('type') == 1 && navigate('/clientprofile');
                                    localStorage.getItem('type') == 2 && navigate('/clientprofile');
                                }}
                                label="My Profile" value="2" />
                        </TabList>
                    </Box>
                </TabContext>
                <NotificationsNoneRoundedIcon onClick={() => {
                    navigate('/notification')
                }} />
                <Divider />
                <Box>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
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
                                        <Typography variant="span">{data.type == 0 ? "Freelancer" : "Client"} </Typography>
                                    </Box>
                                </>
                            }
                        })}</MenuItem>
                        <MenuItem >{accountList && accountList.map((data) => {
                            if (!data.main) {
                                return <>
                                    <AccountCircleRoundedIcon />
                                    <Box className="d-flex row">
                                        <Typography variant="span">{data.fullName} </Typography>
                                        <Typography variant="span">{data.type == 0 ? "Freelancer" : "Client"} </Typography>
                                    </Box>
                                </>
                            }
                        })}</MenuItem>
                        <MenuItem onClick={() => {
                            navigate("/developersetting")
                            handleClose();
                        }} >{accountList && accountList.map((data) => {
                            if (data.main && data.type == 0) {
                                return <>
                                    <SettingsRoundedIcon />
                                    <Typography variant="span">Settings</Typography>
                                </>
                            }
                        })}</MenuItem>
                        <MenuItem onClick={clearLoginToken}><LogoutRoundedIcon />Logout</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </>
    )
}

export default Header
