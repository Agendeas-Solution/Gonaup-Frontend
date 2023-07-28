import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { request } from '../../utils/axios-utils';
import { useMutation } from 'react-query';
import Cookie from 'js-cookie';

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
                <DialogContent>
                    {projectDetail.title}<br></br>
                    {projectDetail.project_url}<br></br>
                    {projectDetail.description}<br></br>
                    {projectDetail.date_from}<br></br>
                    {projectDetail.date_to}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectDetailDialog