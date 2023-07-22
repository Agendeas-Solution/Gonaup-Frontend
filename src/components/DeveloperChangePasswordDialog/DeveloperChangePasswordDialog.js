import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const DeveloperChangePasswordDialog = ({ changePasswordDialogControl, setChangePasswordDialogControl, handleClose, handleUpdatePassword }) => {
    return (
        <>
            <Dialog
                open={changePasswordDialogControl.status}
                onClose={handleClose}
            >
                <DialogTitle>
                    Change Password
                </DialogTitle>
                <DialogContent sx={{ maxWidth: "450px" }}>
                    <TextField value={changePasswordDialogControl.oldPassword}
                        onChange={(e) => {
                            setChangePasswordDialogControl({ ...changePasswordDialogControl, oldPassword: e.target.value })
                        }}
                        className='w-100 mb-3'
                        variant="outlined"
                        label="Old Password" />
                    <TextField
                        value={changePasswordDialogControl.newPassword}
                        onChange={(e) => {
                            setChangePasswordDialogControl({ ...changePasswordDialogControl, newPassword: e.target.value })
                        }}
                        className='w-100 mb-3'
                        variant="outlined"
                        label="New Password" />
                    <TextField
                        value={changePasswordDialogControl.confirmPassword}
                        onChange={(e) => {
                            setChangePasswordDialogControl({ ...changePasswordDialogControl, confirmPassword: e.target.value })
                        }}
                        className='w-100 mb-3'
                        variant="outlined"
                        label="Confirm New Password" />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="All devices will need to sign in with the new password." />
                    </FormGroup>
                </DialogContent>
                <DialogActions className='mt-2'>
                    <Button className='save_button' onClick={handleUpdatePassword} autoFocus>
                        Save
                    </Button>
                    <Button className='cancel_button' onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeveloperChangePasswordDialog