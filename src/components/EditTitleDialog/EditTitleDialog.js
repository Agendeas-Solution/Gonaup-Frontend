import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './index.css'
import { TextField } from '@mui/material';
const EditTitleDialog = ({ editTitleDialogControl, setEditTitleDialogControl, handleClose }) => {

    return (
        <>
            <Dialog
                open={editTitleDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Title
                </DialogTitle>
                <DialogContent>
                    <TextField className='w-100' variant="outlined" label="Job Title" type="text" />
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={handleClose}>Save</Button>
                    <Button className="cancel_button" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default EditTitleDialog