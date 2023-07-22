import { Box, Button, Dialog, DialogActions, Typography } from '@mui/material'
import React from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const CloseAccountDialog = ({ accountCloseDialogControl, handleClose }) => {
    return (
        <>
            <Dialog
                open={accountCloseDialogControl.status}
                onClose={handleClose}
            >
                <Box className="d-flex row p-3 justify-content-center">
                    <CancelRoundedIcon className="cancel_icon" />
                    <Typography variant="span">Account Closure Confirmation</Typography>
                    <Typography variant="span">Are you sure,you want to close your account?</Typography>
                    <Typography variant="span">Please note that this action is irreversible. Once your account is closed, all your account-related activities, purchases, and
                        interactions will be lost, and you will no longer have access to
                        our platform's features and benefits.</Typography>
                    <Typography variant="span">If you're facing any issues or have concerns regarding your account, we encourage you to reach out to our support team.We're here to assist you and address any problems you may be experiencing.</Typography>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CloseAccountDialog