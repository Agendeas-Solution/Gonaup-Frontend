import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { requestAdmin } from '../../utils/axios-utils';
import Cookie from 'js-cookie';
import { Box, Button, Typography } from '@mui/material';

const SkillList = () => {
    const [skillList, setSkillList] = useState([])
    const { mutate: GetSkillList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setSkillList(res.data.data);
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetSkillList({
            url: '/skill/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    return (
        <>
            {skillList?.skillList && skillList?.skillList.map((data) => {
                return <Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Name:
                        </Typography>
                        <Typography variant="span">
                            {data?.name || '-'}
                        </Typography>
                        <Button variant='contained' onClick={() => {
                            // handleDeleteFrameWork(data.id)
                        }}>Delete</Button>
                        <Button variant='contained' onClick={() => {
                            // handleDeleteFrameWork(data.id)
                        }}>Update</Button>
                    </Box>
                </Box>
            })}
        </>
    )
}

export default SkillList