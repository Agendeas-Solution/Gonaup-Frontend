import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const EditAccountDetailDialog = ({ editAccountDetailDialogControl, setEditAccountDetailDialogControl, handleClose, handleUpdateNameEmail }) => {
    return (
        <>
            <Dialog
                open={editAccountDetailDialogControl.status}
                onClose={handleClose}
            >
                <DialogTitle>
                    Edit Account Detail
                </DialogTitle>
                <DialogContent>
                    <Box className="d-flex justify-content-between mb-2">
                        <TextField
                            value={editAccountDetailDialogControl.firstName}
                            onChange={(e) => {
                                setEditAccountDetailDialogControl({ ...editAccountDetailDialogControl, firstName: e.target.value });
                            }}
                            sx={{ width: "45%" }}
                            variant="outlined"
                            label="First Name"
                        />
                        <TextField
                            value={editAccountDetailDialogControl.lastName}
                            onChange={(e) => {
                                setEditAccountDetailDialogControl({ ...editAccountDetailDialogControl, lastName: e.target.value });
                            }}
                            sx={{ width: "45%" }}
                            variant="outlined"
                            label="Last Name"
                        />
                    </Box>
                    <TextField
                        value={editAccountDetailDialogControl.email}
                        onChange={(e) => {
                            setEditAccountDetailDialogControl({ ...editAccountDetailDialogControl, email: e.target.value });
                        }}
                        className='w-100'
                        variant="outlined"
                        label="Email" />
                </DialogContent>
                <DialogActions className='mt-2'>
                    <Button className='save_button' onClick={handleUpdateNameEmail} autoFocus>
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

export default EditAccountDetailDialog