import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './index.css'
import { TextField } from '@mui/material';
const EditTitleDescriptionDialog = ({ editTitleDescriptionDialogControl, setEditTitleDescriptionDialogControl, handleClose, handleUpdateTitleDescription }) => {
    return (
        <>
            <Dialog
                open={editTitleDescriptionDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Title & Description
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={editTitleDescriptionDialogControl.title}
                        onChange={(e) => {
                            setEditTitleDescriptionDialogControl({ ...editTitleDescriptionDialogControl, title: e.target.value })
                        }}
                        className='w-100 my-2'
                        variant="outlined"
                        label="Job Title"
                        type="text" />
                    <TextField
                        value={editTitleDescriptionDialogControl.description}
                        onChange={(e) => {
                            setEditTitleDescriptionDialogControl({ ...editTitleDescriptionDialogControl, description: e.target.value })
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
                    <Button className='save_button' onClick={handleUpdateTitleDescription}>Save</Button>
                    <Button className="cancel_button" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default EditTitleDescriptionDialog