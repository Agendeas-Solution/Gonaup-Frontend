import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import './index.css'
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { TextField, Typography } from '@mui/material';
const EditBudgetDialog = ({ editBudgetDialogControl, setEditBudgetDialogControl, handleClose }) => {
    const [open, setOpen] = React.useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <Dialog
                open={editBudgetDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Budget
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={editBudgetDialogControl.budget}
                        onChange={(e) => {
                            setEditBudgetDialogControl({ ...editBudgetDialogControl, budget: e.target.value });
                        }}
                        className='w-100'
                        variant="outlined"
                        label="Maximum project budget(USD)"
                        placeholder="0"
                        type="text" />
                    <Typography className="sub_heading" variant='span'>You will have the option to create milestones which divide your project into manageable phases.</Typography>
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                placement="bottom"
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="As this job is already published, please close this 
                                job post and create a new job post with the other 
                                budget type."
                            >
                                <Button sx={{ textTransform: "capitalize", color: "#000000", textDecoration: "underline" }} onClick={handleTooltipOpen}>Change Fixed Price to Hourly</Button>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
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

export default EditBudgetDialog