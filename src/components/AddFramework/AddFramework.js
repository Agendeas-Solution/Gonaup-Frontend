import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { requestAdmin } from '../../utils/axios-utils';
import { useMutation } from 'react-query';
import Cookie from 'js-cookie'
const AddFramework = () => {
    const [frameWork, setFrameWork] = useState({ name: null });
    const { mutate: AddFrameWorkCall } = useMutation(requestAdmin);
    const handleAddFramework = async (e) => {
        await AddFrameWorkCall({
            url: '/framework',
            method: 'post',
            data: frameWork,
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            onSuccess: (res) => {
                ;
            },
            onError: (res) => {

            }
        })
    };
    return (
        <>
            <TextField
                className="register_input_fields"
                label="FrameWork"
                placeholder="FrameWork"
                value={frameWork.name}
                onChange={e => {
                    setFrameWork({ ...frameWork, name: e.target.value })
                }}
                variant="outlined"
            />
            <Button onClick={handleAddFramework} variant="contained">Add</Button>
        </>
    )
}

export default AddFramework