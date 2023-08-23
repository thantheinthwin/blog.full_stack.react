import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../api/post';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import DeleteConfirmDialog from './deleteConfirmDialog';

const PostDetails = () => {
  const {postId} = useParams();

  const [postDetails, setPostDetails] = useState('');

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  }

  const handleCloseConfirmDialog = () => {
      setOpenConfirmDialog(false);
  }

  useEffect(()=>{
    getPost(postId)
    .then((res) => {
      setPostDetails(res)
    })
  },[])

  return (
    <div>
      {
        postDetails &&
        <Container maxWidth='md' sx={{mt: 2, py: 2, border: 1, borderRadius: 2, borderColor: 'grey.300'}}>
          <Box display={'grid'} gap={2}>
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
              <Typography variant='h3'>{postDetails[0].title}</Typography>
              <Box sx={{display: 'flex', alignItems: 'end', gap: 1}}>
                <Button variant='outlined' className='h-fit w-fit' color='error' onClick={handleOpenConfirmDialog}>Delete</Button>
                <Button variant='outlined' className='h-fit w-fit'>Edit</Button>
              </Box>
            </Box>
            <Divider/>
            <Typography variant='body1' textAlign={'justify'}>{postDetails[0].content}</Typography>
            <Box sx={{justifySelf: 'end', border: 1, p: 1, borderRadius: 2}} className='cursor-default w-fit'>
              <Typography variant='subtitle2' fontWeight={'bold'}>
                @ {postDetails[0].username}
              </Typography>
            </Box>
          </Box>
          <DeleteConfirmDialog open={openConfirmDialog} handleClose={handleCloseConfirmDialog} id={postId}/>
        </Container>
      }
    </div>
  )
}

export default PostDetails