import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie'
import { Box, Typography } from '@mui/material';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'

const AssignedProject = () => {
    const [assignedProjectList, setAssignedProjectList] = useState(null);
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate } = useMutation(request, {
        onSuccess: (response) => {
            console.log(response);
            setAssignedProjectList(response.data.data);

        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    useEffect(() => {
        mutate({
            url: `/project/freelancer/list`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    return (
        <>{
            assignedProjectList?.projectList.length > 0 && assignedProjectList.projectList.map((data) => {
                return <Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Title:
                        </Typography>
                        <Typography variant="span">
                            {data?.title || '-'}
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
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Fixed Budget:
                        </Typography>
                        <Typography variant="span">
                            {data?.fixed_budget || '-'}
                        </Typography>
                    </Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Hourly Budget:
                        </Typography>
                        <Typography variant="span">
                            {data?.hourly_budget || '-'}
                        </Typography>
                    </Box>
                    <Box className="staff_profile_page">
                        <Typography className="profile_data_lable" variant="span">
                            Project Duration:
                        </Typography>
                        <Typography variant="span">
                            {data?.project_duration || '-'}
                        </Typography>
                    </Box>
                </Box>
            })
        }

        </>
    )
}
export default AssignedProject