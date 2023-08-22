import { Alert, Button, Dialog, DialogContent, DialogTitle, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { deletePost } from '../api/post';
import { useNavigate } from 'react-router-dom';

const DeleteConfirmDialog = (props) => {
    const {id, handleClose, open} = props;

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleDelete = () => {
        deletePost(id)
        .then(res => {
            handleOpenSnackBar();
            setMessage(res);
        })
        .catch(e => {
            setError(true);
            handleOpenSnackBar();
            setMessage(e);
        })
    }

    // Message
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    
    const handleOpenSnackBar = () => {
        setSnackBarOpen(true);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        if ( error === false ){
            navigate(0, {replace: true});
        }

        setSnackBarOpen(false);
        setError(false);
    };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h5'>Are you sure you want to delete ?</Typography>
      </DialogTitle>
      <DialogContent sx={{display: 'flex', gap: 2, justifyContent: 'center'}}>
        <Button variant='outlined' color='error' onClick={handleDelete}>Delete</Button>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
      </DialogContent>
      {/* Feedback Message For Users */}
      {
        error 
        ? 
        <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        :
        <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        }
    </Dialog>
  )
}

export default DeleteConfirmDialog