import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import Cookie from 'js-cookie'
import { request } from '../../utils/axios-utils';
import { Box, Button, Typography } from '@mui/material';
const FreelanceExperienceList = () => {
    const [experienceList, setExperienceList] = useState([]);
    const { mutate: GetFreelanceExperienceList } = useMutation(request, {
        onSuccess: (res) => {
            setExperienceList(res.data.data);
            debugger;
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const { mutate: DeleteFreeLanceExperience } = useMutation(request, {
        onSuccess: (res) => {
            debugger;
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetFreelanceExperienceList({
            url: '/user/freelancer/experience/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleDeleteExperience = async (id) => {
        await DeleteFreeLanceExperience({
            url: '/user/freelancer/experience',
            method: 'delete',
            data: { experienceId: id },
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    };
    return (
        <>
            {experienceList?.experienceList && experienceList.experienceList.map((data) => {
                return <Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Name:
                        </Typography>
                        <Typography variant="span">
                            {data?.name || '-'}
                        </Typography>
                    </Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Experienced Years:
                        </Typography>
                        <Typography variant="span">
                            {data?.experienced_years || '-'}
                        </Typography>
                    </Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Description:
                        </Typography>
                        <Typography variant="span">
                            {data?.description || '-'}
                        </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => {
                        handleDeleteExperience(data.id)
                    }}>Delete</Button>
                </Box>
            })}
        </>
    )
}

export default FreelanceExperienceList