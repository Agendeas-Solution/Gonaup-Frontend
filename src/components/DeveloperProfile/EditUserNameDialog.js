import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

const EditUserNameDialog = ({ editUserNameDialogControl, setEditUserNameDialogControl, handleClose, handleEditUserName }) => {
    return (
        <>
            <Dialog
                open={editUserNameDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit description
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={editUserNameDialogControl.firstName}
                        onChange={(e) => {
                            setEditUserNameDialogControl({ ...editUserNameDialogControl, firstName: e.target.value })
                        }}
                        className='w-100 my-2'
                        variant="outlined"
                        label="First Name"
                        type="text"
                    />
                    <TextField
                        value={editUserNameDialogControl.lastName}
                        onChange={(e) => {
                            setEditUserNameDialogControl({ ...editUserNameDialogControl, lastName: e.target.value })
                        }}
                        className='w-100 my-2'
                        variant="outlined"
                        label="Last Name"
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={handleEditUserName} >Save</Button>
                    <Button className="cancel_button" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditUserNameDialog