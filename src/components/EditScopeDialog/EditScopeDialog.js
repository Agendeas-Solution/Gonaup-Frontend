import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import './index.css'
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
const EditScopeDialog = ({ editScopeDialogControl, handleClose }) => {
    const [value, setValue] = useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
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
                <DialogContent>
                    <Box className="d-flex column">
                        <FormControl>
                            <FormLabel>Level of experience ?</FormLabel>
                            <RadioGroup
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="Entry" />
                                <FormControlLabel value="1" control={<Radio />} label="Intermediate" />
                                <FormControlLabel value="2" control={<Radio />} label="Expert" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>How long will your work take?</FormLabel>
                            <RadioGroup
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="More than 6 months" />
                                <FormControlLabel value="1" control={<Radio />} label="3 to 6 months" />
                                <FormControlLabel value="2" control={<Radio />} label="1 to 3 months" />
                                <FormControlLabel value="2" control={<Radio />} label="less than 1 months" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Hours per week</FormLabel>
                            <RadioGroup
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="More than 30 hrs/week" />
                                <FormControlLabel value="1" control={<Radio />} label="Less than 30 hrs/week" />
                                <FormControlLabel value="2" control={<Radio />} label="I'm not sure" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
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

export default EditScopeDialog