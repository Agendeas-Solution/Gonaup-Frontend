import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, InputLabel, TextField, Typography } from '@mui/material'
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation } from 'react-query';
import { handleApiCountryStateCityGetCall } from '../../utils/axios-utils';
const AddExperienceDialog = ({ addExperienceDialogStatus, handleClose, experienceDetail, setExperienceDetail, handleAddExperience }) => {
    const [countryList, setCountryList] = useState([]);
    const { mutate: GetCountry } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setCountryList(res.data)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const handleGetCountryCall = async (e) => {
        await GetCountry({
            url: '/countries',
            method: 'get',
            data: {},
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    useEffect(() => {
        handleGetCountryCall();
    }, [])
    return (
        <Box>
            <Dialog
                open={addExperienceDialogStatus}
                onClose={handleClose}
            >
                <DialogTitle className='dialog_heading'>
                    Add Work Experience
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <TextField
                            label="Title"
                            type="text"
                            className='my-3 w-100'
                            value={experienceDetail.title}
                            onChange={(e) => {
                                setExperienceDetail({ ...experienceDetail, title: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="Company"
                            type="text"
                            className='my-3 w-100'
                            value={experienceDetail.company}
                            onChange={(e) => {
                                setExperienceDetail({ ...experienceDetail, company: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="City"
                            type="text"
                            className='my-3 w-100'
                            value={experienceDetail.cityName}
                            onChange={(e) => {
                                setExperienceDetail({ ...experienceDetail, cityName: e.target.value });
                            }}
                        />
                        <Autocomplete
                            className="input_fields w-100 my-3"
                            disablePortal
                            disableClearable
                            options={countryList}
                            value={experienceDetail?.country}
                            onChange={(e, value) => {
                                setExperienceDetail({ ...experienceDetail, country: value })
                            }}
                            getOptionLabel={option => option?.name}
                            renderInput={params => (
                                <TextField {...params} label="Select Country" />
                            )}
                        />
                    </Box>
                    <FormGroup className='my-3'>
                        <FormControlLabel control={<Checkbox checked={experienceDetail.isWorking}
                            onChange={(e, value) => {
                                setExperienceDetail({ ...experienceDetail, isWorking: value })
                            }} />} label="I am currently working in this role" />
                    </FormGroup>
                    <Box>
                        <Box className="d-flex justify-content-between my-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-45'
                                    label="Start Date"
                                    value={experienceDetail.workingFrom}
                                    onChange={(e) => {
                                        setExperienceDetail({ ...experienceDetail, workingFrom: e });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-45'
                                    label="End Date"
                                    value={experienceDetail.workgingTo}
                                    onChange={(e) => {
                                        setExperienceDetail({ ...experienceDetail, workgingTo: e });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box>
                        <TextField
                            label="Describe your studies, awards, etc."
                            type="text"
                            className='mt-3 w-100'
                            multiline
                            value={experienceDetail.description}
                            onChange={(e) => {
                                setExperienceDetail({ ...experienceDetail, description: e.target.value });
                            }}
                            rows={4}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button className="save_button mx-3" onClick={handleAddExperience} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AddExperienceDialog