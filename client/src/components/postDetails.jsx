import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

const PostDetails = (props) => {
    const { handleClose, post, open } = props;


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h3'>{post.title}</Typography>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Button variant='outlined' className='h-fit w-fit' color='error'>Delete</Button>
            <Button variant='outlined' className='h-fit w-fit'>Edit</Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant='body1'>{post.content}</Typography>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetails