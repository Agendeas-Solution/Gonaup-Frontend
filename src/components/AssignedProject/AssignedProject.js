import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import Cookie from 'js-cookie'
import { Box, Typography } from '@mui/material';
const AssignedProject = () => {
    const [assignedProjectList, setAssignedProjectList] = useState(null);
    const { mutate } = useMutation(request, {
        onSuccess: (response) => {
            console.log(response);
            setAssignedProjectList(response.data.data);
            debugger
        },
        onError: (response) => {
            console.log(response);
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