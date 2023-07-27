import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const DeleteFreelancerProjectDialog = ({ deleteFreelancerProjectDialogControl, handleDeleteFreelancerProject, handleClose }) => {
    return (
        <>
            <Dialog
                open={deleteFreelancerProjectDialogControl.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <DeleteRoundedIcon />
                    <Typography className="developer_main_heading" variant="span"> Delete this Freelancer Project</Typography>
                </Box>
                <DialogContent>
                    Are you sure to Delete this Freelancer Project?
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button" onClick={() => {
                        handleDeleteFreelancerProject(deleteFreelancerProjectDialogControl.id)
                    }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteFreelancerProjectDialog