import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import './index.css'
import { Autocomplete, Box, Chip, TextField, Typography, createFilterOptions } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import { useMutation } from 'react-query';
import { handleApiCountryStateCityGetCall } from '../../utils/axios-utils';
import Uploader from '../Uploader/Uploader';
import 'react-phone-number-input/style.css'
import { styled } from '@mui/system';

const StyledPhoneInput = styled(PhoneInput)({
    '& input': {
        border: 'none', // Remove the border
        outline: 'none', // Remove the outline
        boxShadow: 'none', // Remove any box shadow
        height: "45px"
    },
});
const EditContactDialog = ({ editContactDialogControl, setEditContactDialogControl, handleClose, handleEditContactDetail }) => {
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const { mutate: GetCountry } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setCountryList(res.data)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const { mutate: GetState } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setStateList(res.data)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const { mutate: GetCity } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setCityList(res.data)
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const handleGetStateCall = async (data) => {
        await GetState({
            url: `/countries/${data}/states`,
            method: 'get',
            data: {},
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    const handleGetCityCall = async (data) => {
        await GetCity({
            url: `/countries/` + data,
            method: 'get',
            data: {},
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    useEffect(() => {
        let data = editContactDialogControl?.country?.iso2
        editContactDialogControl?.country && handleGetStateCall(data);
    }, [editContactDialogControl?.country]);
    useEffect(() => {
        let data = editContactDialogControl?.state?.iso2
            ? `${editContactDialogControl?.country?.iso2}/states/${editContactDialogControl?.state?.iso2}/cities`
            : ''
        editContactDialogControl?.state && handleGetCityCall(data);
    }, [editContactDialogControl?.state])
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
    useEffect(() => {
        setImageUrl(editContactDialogControl?.image_url)
    }, [editContactDialogControl?.image_url])
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option?.name,
    })
    return (
        <>
            <Dialog
                open={editContactDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogTitle className="dialog_heading">
                    Edit Contact
                </DialogTitle>
                <DialogContent className="d-flex row">
                    <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    <StyledPhoneInput
                        placeholder="Enter Mobile No"
                        value={editContactDialogControl.contactNumber}
                        defaultCountry="US"
                        className='my-2'
                        onChange={(event) => {
                            setEditContactDialogControl({ ...editContactDialogControl, contactNumber: event })
                        }}
                    />
                    <TextField
                        label="Skype Id"
                        variant="outlined"
                        type="text"
                        className='my-2'
                        value={editContactDialogControl.skypeId}
                        onChange={(e) => setEditContactDialogControl({ ...editContactDialogControl, skypeId: e.target.value })}
                    />
                    <Autocomplete
                        className=" my-2"
                        disablePortal
                        // disableClearable
                        options={countryList}
                        value={editContactDialogControl?.country}
                        onChange={(e, value) => {
                            setEditContactDialogControl({ ...editContactDialogControl, country: value })
                        }}
                        getOptionLabel={option => option?.name}
                        renderInput={params => (
                            <TextField {...params} label="Select Country" />
                        )}
                    />
                    <Autocomplete
                        className="w-25"
                        options={stateList}
                        // disableClearable
                        // disabled={!editContactDialogControl?.country}
                        filterOptions={filterOptions}
                        value={editContactDialogControl?.state}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => {
                            setEditContactDialogControl({ ...editContactDialogControl, state: value })
                        }}
                        renderInput={params => (
                            <TextField {...params} label=" Select State" />
                        )}
                    />
                    <Autocomplete
                        className="w-25"
                        options={cityList}
                        // disableClearable
                        // disabled={!editContactDialogControl?.state}
                        filterOptions={filterOptions}
                        value={editContactDialogControl?.city}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => {
                            setEditContactDialogControl({ ...editContactDialogControl, city: value })
                        }}
                        renderInput={params => (
                            <TextField {...params} label="Select City" />
                        )}
                    />
                    <TextField
                        label="Zip/Postal Code"
                        variant="outlined"
                        type="text"
                        value={editContactDialogControl.zipCode}
                        onChange={(e) => setEditContactDialogControl({ ...editContactDialogControl, zipCode: e.target.value })}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        type="text"
                        value={editContactDialogControl.address}
                        onChange={(e) => setEditContactDialogControl({ ...editContactDialogControl, address: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className='save_button'
                        onClick={() => handleEditContactDetail(imageUrl)}
                    >
                        Save</Button>
                    <Button className="cancel_button" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditContactDialog