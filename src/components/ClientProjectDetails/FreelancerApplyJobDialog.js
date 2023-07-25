import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

const FreelancerApplyJobDialog = ({ setFreelancerApplyJobDialogControl, freelancerApplyJobDialogControl, handleApplyProject, handleDialogClose }) => {
    return (
        <>
            <Dialog
                open={freelancerApplyJobDialogControl.status}
                onClose={handleDialogClose}
                sx={{ width: "75%", maxWidth: "auto", margin: "0 auto" }}
            >
                <DialogTitle>
                    Add Project
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Box className="add_project_textfield">
                            <TextField
                                value={freelancerApplyJobDialogControl.bidAmount}
                                onChange={(e) => {
                                    setFreelancerApplyJobDialogControl({ ...freelancerApplyJobDialogControl, bidAmount: e.target.value })
                                }}
                                label="Bid Amount"
                                variant="outlined" />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button className="save_button" onClick={handleApplyProject}>Save</Button>
                    <Button className="cancel_button" onClick={handleDialogClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FreelancerApplyJobDialog