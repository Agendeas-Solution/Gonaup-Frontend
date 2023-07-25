import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
const EditHourlyRateDialog = ({ editHourlyRateDialogControl,
    setEditHourlyRateDialogControl, handleClose, handleEditHourlyRate }) => {
    return (
        <>
            <Dialog
                open={editHourlyRateDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Budget
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={editHourlyRateDialogControl.hourlyRate}
                        onChange={(e) => {
                            setEditHourlyRateDialogControl({ ...editHourlyRateDialogControl, hourlyRate: e.target.value })
                        }}
                        className='w-100'
                        variant="outlined"
                        label="Hourly Rate"
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button className='save_button' onClick={handleEditHourlyRate} >Save</Button>
                    <Button className="cancel_button" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditHourlyRateDialog