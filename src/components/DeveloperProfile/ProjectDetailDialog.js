import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { request } from '../../utils/axios-utils';
import { useMutation } from 'react-query';
import Cookie from 'js-cookie';
import DoneIcon from '@mui/icons-material/Done';
import moment from 'moment/moment';
import RectangularChip from '../RectangularChip/RectangularChip';
import { Context as ContextSnackbar } from '../../context/notificationContext/notificationContext'
const ProjectDetailDialog = ({ projectDetailDialogControl, handleClose }) => {
    const [projectDetail, setProjectDetail] = useState({});
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate: GetDeveloperProfile } = useMutation(request, {
        onSuccess: (res) => {
            setProjectDetail(res.data.data)
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    useEffect(() => {
        GetDeveloperProfile({
            url: `/user/freelancer/project?projectId=${projectDetailDialogControl.id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [projectDetailDialogControl.id])
    return (
        <>
            <Dialog
                open={projectDetailDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogContent className='d-flex row'>
                    <Typography variant="h5" className='mx-1 my-2'>{projectDetail.title}</Typography>
                    {projectDetail.projectImageArray && projectDetail.projectImageArray.map((data) => {
                        return <Box className="project_images my-2">
                            <img src={data} alt="" />
                        </Box>
                    })}
                    <Box className="d-flex column mx-1 my-2">
                        <Box className="d-flex row">
                            <Typography variant="span sub_heading">Duration</Typography>
                            <Typography variant="span">{moment(projectDetail.date_from).format('ll')}- {moment(projectDetail.date_to).format('ll')}</Typography>
                        </Box>
                        <Box className="d-flex row">
                            <Typography variant="span sub_heading">Project URL</Typography>
                            <Typography variant="span">{projectDetail.project_url}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="span" className='mx-1 mt-2 sub_heading'>Skills</Typography>
                    <Stack direction="row" spacing={1}>
                        {projectDetail.skills && projectDetail.skills.map((chip) => (
                            <RectangularChip
                                key={chip.id}
                                deleteIcon={< DoneIcon />}
                                label={chip.name}
                                style={{ margin: '4px' }}
                                className='mb-2'
                            />
                        ))}
                    </Stack>
                    <Typography variant='span' className='mx-1 mt-2 sub_heading'>Overview</Typography>
                    <Typography variant="span" className='mx-1'>{projectDetail.description}</Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectDetailDialog