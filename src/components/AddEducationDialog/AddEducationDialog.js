import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddEducationDialog = ({ addEducationDialogStatus,
    handleClose, educationDetail, setEducationDetail, handleAddEducationDetail }) => {
    return (
        <div>
            <Dialog
                open={addEducationDialogStatus}
                onClose={handleClose}
            >
                <DialogTitle className="dialog_heading">
                    Add Education History
                </DialogTitle>
                <DialogContent>
                    <Box>
                        {/* <InputLabel>School</InputLabel> */}
                        <TextField
                            className='w-100 mt-1 mb-3'
                            label="School"
                            type="text"
                            value={educationDetail.school}
                            onChange={(e) => {
                                setEducationDetail({ ...educationDetail, school: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        {/* <InputLabel>Degree</InputLabel> */}
                        <TextField
                            className='w-100 mt-1 mb-3'
                            label="Degree"
                            type="text"
                            value={educationDetail.degree}
                            onChange={(e) => {
                                setEducationDetail({ ...educationDetail, degree: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        {/* <InputLabel>Field of Study</InputLabel> */}
                        <TextField
                            className='w-100 mt-1 mb-3'
                            label="Field of Study"
                            type="text"
                            value={educationDetail.studyIn}
                            onChange={(e) => {
                                setEducationDetail({ ...educationDetail, studyIn: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <InputLabel>Dates Attended</InputLabel>
                        <Box className="d-flex justify-content-between mt-1 mb-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-45'
                                    views={['year']}
                                    value={new Date(`${educationDetail.dateFrom}-01-01`)}
                                    onChange={(e) => {
                                        setEducationDetail({ ...educationDetail, dateFrom: e });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-45'
                                    views={['year']}
                                    value={new Date(`${educationDetail.dateTo}-01-01`)}
                                    onChange={(e) => {
                                        setEducationDetail({ ...educationDetail, dateTo: e });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box>
                        {/* <InputLabel>Description</InputLabel> */}
                        <TextField
                            className='w-100 mt-1'
                            label="Description"
                            type="text"
                            multiline
                            value={educationDetail.description}
                            onChange={(e) => {
                                setEducationDetail({ ...educationDetail, description: e.target.value });
                            }}
                            rows={4}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button className="save_button mx-3"
                        onClick={handleAddEducationDetail}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddEducationDialog