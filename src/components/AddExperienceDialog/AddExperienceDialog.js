import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, InputLabel, TextField } from '@mui/material'
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
        <div>
            <Dialog
                open={addExperienceDialogStatus}
                onClose={handleClose}
            >
                <DialogTitle>
                    Add Work Experience
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <TextField
                            label="Ex: Software Engineer"
                            type="text"
                            className='my-2'
                            value={experienceDetail.title}
                            onChange={(e) => {
                                setExperienceDetail({ ...experienceDetail, title: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="Ex: Microsoft"
                            type="text"
                            className='my-2'
                            value={experienceDetail.company}
                            onChange={(e) => {
                                setExperienceDetail({ ...experienceDetail, company: e.target.value });
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="Ex: London"
                            type="text"
                            className='my-2'
                            value={experienceDetail.cityName}
                            onChange={(e) => {
                                setExperienceDetail({ ...experienceDetail, cityName: e.target.value });
                            }}
                        />
                        <Autocomplete
                            className="input_fields"
                            disablePortal
                            disableClearable
                            options={countryList}
                            value={experienceDetail?.country}
                            onChange={(e, value) => {
                                setExperienceDetail({ ...experienceDetail, country: value })
                                    ;
                            }}
                            getOptionLabel={option => option?.name}
                            renderInput={params => (
                                <TextField {...params} placeholder="Select Country" />
                            )}
                        />
                    </Box>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={experienceDetail.isWorking}
                            onChange={(e, value) => {
                                setExperienceDetail({ ...experienceDetail, isWorking: value })
                            }} />} label="I am currently working in this role" />
                    </FormGroup>
                    <Box>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    placeholder="Start Date"
                                    value={experienceDetail.workingFrom}
                                    onChange={(e) => {
                                        setExperienceDetail({ ...experienceDetail, workingFrom: e });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="End Date"
                                    placeholder="End Date"
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
                        <InputLabel>Description</InputLabel>
                        <TextField
                            label="Describe your studies, awards, etc."
                            type="text"
                            className='my-2'
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
                    <Button className="save_button" onClick={handleAddExperience} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddExperienceDialog