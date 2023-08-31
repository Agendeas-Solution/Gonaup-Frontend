import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
const EditRoleAndOverviewDialog = ({ editRoleAndOverviewDialogControl, setEditRoleAndOverviewDialogControl, handleClose, handleEditRoleAndOverviewDialog }) => {
    return (
        <>
            <Dialog
                open={editRoleAndOverviewDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Role & Overview
                </DialogTitle>
                <DialogContent className='mx-2'>
                    <TextField
                        value={editRoleAndOverviewDialogControl.professionalRole}
                        onChange={(e) => {
                            setEditRoleAndOverviewDialogControl({ ...editRoleAndOverviewDialogControl, professionalRole: e.target.value })
                        }}
                        className='w-100 my-4'
                        variant="outlined"
                        label="Your professional role"
                        type="text"
                    />
                    <TextField
                        value={editRoleAndOverviewDialogControl.description}
                        onChange={(e) => {
                            setEditRoleAndOverviewDialogControl({ ...editRoleAndOverviewDialogControl, description: e.target.value })
                        }}
                        className='w-100 mt-3'
                        variant="outlined"
                        label="Your Overview"
                        type="text"
                        rows={3}
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={handleEditRoleAndOverviewDialog} >Save</Button>
                    <Button className="cancel_button px-4 mx-4" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditRoleAndOverviewDialog