import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
const EditDescriptionDialog = ({ editDescriptionDialogControl, setEditDescriptionDialogControl, handleClose }) => {
    return (
        <>
            <Dialog
                open={editDescriptionDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit description
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={editDescriptionDialogControl.description}
                        onChange={() => {
                            setEditDescriptionDialogControl({ ...editDescriptionDialogControl, description: editDescriptionDialogControl.description })
                        }}
                        className='w-100 my-2'
                        variant="outlined"
                        label="Detailed Job description here"
                        type="text"
                        multiline
                        rows={3}
                    />
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
export default EditDescriptionDialog