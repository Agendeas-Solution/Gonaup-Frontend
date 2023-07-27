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
                <DialogTitle className="dialog_heading">
                    Edit Profile Link
                </DialogTitle>
                <DialogContent className="d-flex row">
                    <Typography variant="span">LinkedIn Profile</Typography>
                    <TextField
                        placeholder="LinkedIn Profile"
                        variant="outlined"
                        type="text"
                        value={editProfileLinkDialogControl.linkdinProfile}
                        onChange={(e) => setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, linkdinProfile: e.target.value })}
                    />
                    <Typography variant="span">Freelancer Profile</Typography>
                    <TextField
                        placeholder="Freelancer Profile"
                        variant="outlined"
                        type="text"
                        value={editProfileLinkDialogControl.freelanceProfile}
                        onChange={(e) => setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, freelanceProfile: e.target.value })}
                    />
                    <Typography variant="span">Github Profile Links</Typography>
                    <TextField
                        placeholder="Github Profile Links"
                        variant="outlined"
                        type="text"
                        value={editProfileLinkDialogControl.githubProfile}
                        onChange={(e) => setEditProfileLinkDialogControl({ ...editProfileLinkDialogControl, githubProfile: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className='save_button'
                        onClick={handleEditProfileLink}
                    >
                        Save</Button>
                    <Button className="cancel_button" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default EditProfileLinkDialog