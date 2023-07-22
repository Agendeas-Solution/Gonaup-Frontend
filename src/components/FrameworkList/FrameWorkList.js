import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query';
import { requestAdmin } from '../../utils/axios-utils';
import { Box, Button, Typography } from '@mui/material';
const FrameWorkList = () => {
    const [frameWorkList, setFrameWorkList] = useState(null);
    const { mutate: GetFrameWorkList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setFrameWorkList(res.data.data);
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const { mutate: DeleteFrameWork } = useMutation(requestAdmin, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetFrameWorkList({
            url: '/framework/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleDeleteFrameWork = ((id) => {
        DeleteFrameWork({
            url: '/framework',
            method: 'delete',
            data: { frameworkId: id },
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            }
        })
    })
    return (
        <>
            {frameWorkList?.frameworkList && frameWorkList?.frameworkList.map((data) => {
                return <Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Name:
                        </Typography>
                        <Typography variant="span">
                            {data?.name || '-'}
                        </Typography>
                        <Button variant='contained' onClick={() => {
                            handleDeleteFrameWork(data.id)
                        }}>Delete</Button>
                        <Button variant='contained' onClick={() => {
                            handleDeleteFrameWork(data.id)
                        }}>Update</Button>
                    </Box>
                </Box>
            })}
        </>
    )
}

export default FrameWorkList