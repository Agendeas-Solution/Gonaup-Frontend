import { EditRounded } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import CloseAccountDialog from '../CloseAccountDialog/CloseAccountDialog'
import EditAccountDetailDialog from '../container/EditAccountDetailDialog/EditAccountDetailDialog'
import DeveloperChangePasswordDialog from '../DeveloperChangePasswordDialog/DeveloperChangePasswordDialog'
import Cookie from 'js-cookie'
import { request } from '../../utils/axios-utils'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
const DeveloperSetting = () => {
    const [accountCloseDialogControl, setAccountCloseDialogControl] = useState({
        status: false
    })
    const [editAccountDetailDialogControl, setEditAccountDetailDialogControl] = useState({
        status: false,
        firstName: "",
        lastName: "",
        email: ""
    })
    const [changePasswordDialogControl, setChangePasswordDialogControl] = useState({
        status: false,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({});
    const handleClose = () => {
        setEditAccountDetailDialogControl({ ...editAccountDetailDialogControl, status: false })
        setAccountCloseDialogControl({ ...accountCloseDialogControl, status: false })
        setChangePasswordDialogControl({ ...changePasswordDialogControl, status: false })
        setEditAccountDetailDialogControl({ ...editAccountDetailDialogControl, status: false })
    }
    const { mutate: GetUserProfile } = useMutation(request, {
        onSuccess: (res) => {
            setUserDetail(res.data.data)
            setEditAccountDetailDialogControl({
                ...editAccountDetailDialogControl,
                firstName: res.data.data.first_name,
                lastName: res.data.data.last_name,
                email: res.data.data.email
            })
        },
        onError: (err) => {
            console.log(err);
        }
    });


    const { mutate: CloseAccount } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleCloseAccount = async () => {
        await CloseAccount({
            url: '/user/close-account',
            method: 'DELETE',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }


    //Update Name And Email
    const { mutate: UpdateNameEmail } = useMutation(request, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateNameEmail = async () => {
        await UpdateNameEmail({
            url: '/user/details',
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                firstName: editAccountDetailDialogControl.firstName,
                lastName: editAccountDetailDialogControl.lastName,
                email: editAccountDetailDialogControl.email
            }
        })
    }

    //Update Password
    const { mutate: UpdatePassword } = useMutation(request, {
        onSuccess: (res) => {

        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdatePassword = async () => {
        if (changePasswordDialogControl.newPassword === changePasswordDialogControl.confirmPassword) {
            await UpdatePassword({
                url: '/auth/change-password',
                method: 'put',
                headers: {
                    Authorization: `${Cookie.get('userToken')}`,
                },
                data: {
                    oldPassword: changePasswordDialogControl.oldPassword,
                    newPassword: changePasswordDialogControl.newPassword
                }
            })
        }
        else {
            return
        }
    }
    useEffect(() => {
        GetUserProfile({
            url: '/user/profile',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    return (
        <>
            <Box className="developer_border_main_section">
                <Box className="d-flex justify-content-between mb-2">
                    <Typography className="developer_main_heading" variant="span">Account</Typography>
                    <EditRounded onClick={() => setEditAccountDetailDialogControl({ ...editAccountDetailDialogControl, status: true })} className="circular_icon" />
                </Box>
                <Box className="developer_personal_detail mx-1">
                    <Box className="d-flex row mb-3">
                        <Typography className="sub_heading" variant="span">User ID</Typography>
                        <Typography variant="span">{userDetail.first_name}</Typography>
                    </Box>
                    <Box className="d-flex row mb-3">
                        <Typography className="sub_heading" variant="span">Name</Typography>
                        <Typography variant="span">{userDetail.first_name} {userDetail.last_name}</Typography>
                    </Box>
                    <Box className="d-flex row mb-3">
                        <Typography className="sub_heading" variant="span">Email</Typography>
                        <Typography variant="span">{userDetail.email}</Typography>
                    </Box>
                </Box>
                <Box className="d-flex justify-content-end">
                    <Button onClick={() => setAccountCloseDialogControl({ ...accountCloseDialogControl, status: true })} className="border_common_button" variant="span">Close my account</Button>
                </Box>
            </Box>
            <Box className="developer_border_main_section">
                <Box className="d-flex justify-content-between mb-2">
                    <Typography className="developer_main_heading" variant="span">Additional accounts</Typography>
                </Box>
                <Box className="developer_personal_detail mx-1 mb-3">
                    Take the reins of your success and post your projects here to hire other skilled professionals and build your dream team.Click the button now and make the leap to becoming a client on Gonaup!"
                </Box>
                <Box className="d-flex justify-content-end">
                    <Button onClick={() => {
                        navigate('/companyprofile')
                    }} className="border_common_button" variant="span">New Client Account</Button>
                </Box>
            </Box>
            <Box className="developer_border_main_section">
                <Box className="d-flex justify-content-between mb-2">
                    <Typography className="developer_main_heading" variant="span">Password</Typography>
                    <EditRounded onClick={() => setChangePasswordDialogControl({ ...changePasswordDialogControl, status: true })} className="circular_icon" />
                </Box>
                <Box className="developer_personal_detail mx-1">
                    Take the reins of your success and post your projects here to hire other skilled professionals and build your dream team.Click the button now and make the leap to becoming a client on Gonaup!"
                </Box>
            </Box>
            <CloseAccountDialog handleCloseAccount={handleCloseAccount} accountCloseDialogControl={accountCloseDialogControl} setAccountCloseDialogControl={setAccountCloseDialogControl} handleClose={handleClose} />
            <EditAccountDetailDialog editAccountDetailDialogControl={editAccountDetailDialogControl} setEditAccountDetailDialogControl={setEditAccountDetailDialogControl} handleClose={handleClose} handleUpdateNameEmail={handleUpdateNameEmail} />
            <DeveloperChangePasswordDialog changePasswordDialogControl={changePasswordDialogControl} setChangePasswordDialogControl={setChangePasswordDialogControl} handleClose={handleClose}
                handleUpdatePassword={handleUpdatePassword}
            />
        </>
    )
}

export default DeveloperSetting