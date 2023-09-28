import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import './index.css'
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { PROJECT } from '../../constants/projectConstant';
const EditScopeDialog = ({ editScopeDialogControl, setEditScopeDialogControl, handleUpdateProjectRequirement, handleClose }) => {

    return (
        <>
            <Dialog
                open={editScopeDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Scope
                </DialogTitle>
                <DialogContent className='d-flex justify-content-center align-item-center'>
                    <Box className="d-flex column">
                        <FormControl>
                            <FormLabel>Level of experience ?</FormLabel>
                            <RadioGroup
                                value={editScopeDialogControl.experienceNeeded}
                                onChange={(e) => {
                                    setEditScopeDialogControl({ ...editScopeDialogControl, experienceNeeded: e.target.value })
                                }}
                            >
                                {
                                    PROJECT.EXPERIENCE_LEVEL.map((data) => {
                                        return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                        <FormControl className='ms-2'>
                            <FormLabel>How long will your work take?</FormLabel>
                            <RadioGroup
                                value={editScopeDialogControl.projectDuration}
                                onChange={(e) => {
                                    setEditScopeDialogControl({ ...editScopeDialogControl, projectDuration: e.target.value })
                                }}
                            >
                                {
                                    PROJECT.PROJECT_DURATION.map((data) => {
                                        return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                                    })
                                }

                            </RadioGroup>
                        </FormControl>
                        <FormControl className='ms-2'>
                            <FormLabel>Hours per week</FormLabel>
                            <RadioGroup
                                value={editScopeDialogControl.hourePerWeek}
                                onChange={(e) => {
                                    setEditScopeDialogControl({ ...editScopeDialogControl, hourePerWeek: e.target.value })
                                }}
                            >
                                {
                                    PROJECT.HOUR_PER_WEEK.map((data) => {
                                        return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={handleUpdateProjectRequirement}>Save</Button>
                    <Button className="cancel_button edit_client_project_cancel" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditScopeDialog