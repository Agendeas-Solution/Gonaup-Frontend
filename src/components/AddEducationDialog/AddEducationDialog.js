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
                <DialogTitle>
                    Add Education History
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <InputLabel>School</InputLabel>
                        <TextField
                            placeholder="Ex: Northwestern University"
                            type="text"
                            value={educationDetail.school}
                            onChange={(e) => {
                                setEducationDetail({ ...educationDetail, school: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <InputLabel>Degree</InputLabel>
                        <TextField
                            placeholder="Ex: Bachelors"
                            type="text"
                            value={educationDetail.degree}
                            onChange={(e) => {
                                setEducationDetail({ ...educationDetail, degree: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <InputLabel>Field of Study</InputLabel>
                        <TextField
                            placeholder="Ex: Computer Science"
                            type="text"
                            value={educationDetail.studyIn}
                            onChange={(e) => {
                                setEducationDetail({ ...educationDetail, studyIn: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <InputLabel>Dates Attended</InputLabel>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
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
                        <InputLabel>Description</InputLabel>
                        <TextField
                            placeholder="Describe your studies, awards, etc."
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
                    <Button className="save_button"
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