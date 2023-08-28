import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { request } from '../../utils/axios-utils';
import { useMutation } from 'react-query';
import Cookie from 'js-cookie';
import DoneIcon from '@mui/icons-material/Done';
import moment from 'moment/moment';
import RectangularChip from '../RectangularChip/RectangularChip';
const ProjectDetailDialog = ({ projectDetailDialogControl, handleClose }) => {
    const [projectDetail, setProjectDetail] = useState({});
    const { mutate: GetDeveloperProfile } = useMutation(request, {
        onSuccess: (res) => {
            setProjectDetail(res.data.data)
        },
        onError: (err) => {
            console.log(err);
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
                    <Typography variant="h5">{projectDetail.title}</Typography>
                    {projectDetail.projectImageArray && projectDetail.projectImageArray.map((data) => {
                        return <Box className="project_images ">
                            <img src={data} alt="" />
                        </Box>
                    })}
                    <Box className="d-flex column">
                        <Box className="d-flex row">
                            <Typography variant="span">Duration</Typography>
                            <Typography variant="span">{moment(projectDetail.date_from).format('ll')}- {moment(projectDetail.date_to).format('ll')}</Typography>
                        </Box>
                        <Box className="d-flex row">
                            <Typography variant="span">Project URL</Typography>
                            <Typography variant="span">{projectDetail.project_url}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="span">Skills</Typography>
                    <Stack direction="row" spacing={1}>
                        {projectDetail.skills && projectDetail.skills.map((chip) => (
                            <RectangularChip
                                key={chip.id}
                                deleteIcon={< DoneIcon />}
                                label={chip.name}
                                style={{ margin: '4px' }}
                            />
                        ))}
                    </Stack>
                    <Typography variant='span'>Overview</Typography>
                    <Typography variant="span">{projectDetail.description}</Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectDetailDialog