import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useNavigate, useParams } from 'react-router-dom';
import FreelancerApplyJobDialog from './FreelancerApplyJobDialog';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';

const ProjectDetailRightSection = ({ projectDetail, setDeleteProjectDialogControl, deleteProjectDialogControl }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [freelancerApplyJobDialogControl, setFreelancerApplyJobDialogControl] = useState({
        status: false,
        bidAmount: 0,
        projectId: id
    });
    const { mutate: ApplyForProject } = useMutation(request, {
        onSuccess: (res) => {
            handleDialogClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleDialogClose = () => {
        setFreelancerApplyJobDialogControl({ ...freelancerApplyJobDialogControl, status: false })
    }
    const handleApplyProject = () => {
        ApplyForProject({
            url: '/project/apply',
            method: 'PUT',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                suggestedRate: parseInt(freelancerApplyJobDialogControl.bidAmount),
                projectId: parseInt(freelancerApplyJobDialogControl.projectId)
            }
        })
    }
    return (
        <>
            <Box className="project_detail_right_section">
                {(localStorage.getItem('type') == 1 || localStorage.getItem('type') == 2) && <>
                    <Button
                        variant="standard"
                        onClick={() => {
                            localStorage.getItem('type') == 1 && navigate(`/editclientprojectdetails/${id}`, { state: projectDetail })
                            localStorage.getItem('type') == 2 && navigate(`/editrecruiterprojectdetails/${id}`, { state: projectDetail })
                        }}
                        className='client_project_detail_button'>
                        <EditIcon />Edit Posting</Button>
                    <Button onClick={() => {
                        setDeleteProjectDialogControl({ ...deleteProjectDialogControl, status: true, projectId: projectDetail.id })
                    }}
                        variant="standard"
                        className='client_project_detail_button'
                    ><DeleteRoundedIcon />
                        Delete Posting
                    </Button>
                </>
                }
                {localStorage.getItem('type') == 0 &&
                    <>
                        <Button
                            variant="standard"
                            onClick={() => {
                                setFreelancerApplyJobDialogControl({ ...freelancerApplyJobDialogControl, status: true })
                            }}
                            disabled={projectDetail.invited == 1 ? true : false}
                            className={projectDetail.invited == 1 ? "disable_button" : "save_button"}>
                            <EditIcon />Apply Now
                        </Button>
                    </>
                }
            </Box >
            <FreelancerApplyJobDialog freelancerApplyJobDialogControl={freelancerApplyJobDialogControl} setFreelancerApplyJobDialogControl={setFreelancerApplyJobDialogControl} handleApplyProject={handleApplyProject} handleDialogClose={handleDialogClose} />
        </>
    )
}

export default ProjectDetailRightSection