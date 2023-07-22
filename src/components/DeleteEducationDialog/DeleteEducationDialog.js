import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const DeleteEducationDialog = ({ deleteEducationDialogStatus, handleClose, handleDeleteEducation }) => {
    return (
        <>
            <Dialog
                open={deleteEducationDialogStatus.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <DeleteRoundedIcon />
                    <Typography className="developer_main_heading" variant="span"> Remove Education</Typography>
                </Box>
                <DialogContent>
                    Are you sure to remove this Education?
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button" onClick={() => {
                        handleDeleteEducation(deleteEducationDialogStatus.id)
                    }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteEducationDialog