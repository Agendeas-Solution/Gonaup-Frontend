import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const DeleteExperienceDialog = ({ deleteExperienceDialogStatus, handleClose, handleDeleteExperience }) => {
    return (
        <>
            <Dialog
                open={deleteExperienceDialogStatus.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <DeleteRoundedIcon />
                    <Typography className="developer_main_heading" variant="span"> Remove Experience</Typography>
                </Box>
                <DialogContent>
                    Are you sure to remove this experience?
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button" onClick={() => {
                        handleDeleteExperience(deleteExperienceDialogStatus.id)
                    }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteExperienceDialog