import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import './index.css'
import { Box, Chip, TextField, Typography } from '@mui/material';

const EditProfileLinkDialog = ({ editProfileLinkDialogControl, setEditProfileLinkDialogControl, handleClose, handleEditProfileLink }) => {
    return (
        <>
            <Dialog
                open={editProfileLinkDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading ">
                    Edit Profile Link
                </DialogTitle>
                <DialogContent className="d-flex row overflow-hidden mx-1">
                    <TextField
                        label="LinkedIn Profile"
                        variant="outlined"
                        className='w-100 my-3'
                        type="text"
                        value={editProfileLinkDialogControl.linkdinProfile}
                        onChange={(e) => setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, linkdinProfile: e.target.value })}
                    />
                    <TextField
                        label="Freelancer Profile"
                        variant="outlined"
                        type="text"
                        className='w-100 my-3'
                        value={editProfileLinkDialogControl.freelanceProfile}
                        onChange={(e) => setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, freelanceProfile: e.target.value })}
                    />
                    <TextField
                        label="Github Profile Links"
                        variant="outlined"
                        type="text"
                        className='w-100 mt-3'
                        value={editProfileLinkDialogControl.githubProfile}
                        onChange={(e) => setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, githubProfile: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className='save_button'
                        onClick={handleEditProfileLink}
                    >
                        Save</Button>
                    <Button className="cancel_button px-4 mx-3" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default EditProfileLinkDialog