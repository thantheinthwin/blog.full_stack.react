import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteConfirmDialog from './deleteConfirmDialog';

const PostDetailsDialog = (props) => {
    const { handleClose, post, open } = props;

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    }

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h3'>{post.title}</Typography>
        <Box sx={{display: 'flex', alignItems: 'end', gap: 1}}>
            <Button variant='outlined' className='h-fit w-fit' color='error' onClick={handleOpenConfirmDialog}>Delete</Button>
            <Button variant='outlined' className='h-fit w-fit'>Edit</Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant='body1'>{post.content}</Typography>
      </DialogContent>
      <DeleteConfirmDialog open={openConfirmDialog} handleClose={handleCloseConfirmDialog} id={post.id}/>
    </Dialog>
  )
}

export default PostDetailsDialog