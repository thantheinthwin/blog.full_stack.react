import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../api/post';
import { Box, Container, Divider, Typography } from '@mui/material';

const PostDetails = () => {
  const {postId} = useParams();

  const [postDetails, setPostDetails] = useState('');

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
            <Typography variant='h3'>{postDetails[0].title}</Typography>
            <Divider/>
            <Typography variant='body1' textAlign={'justify'}>{postDetails[0].content}</Typography>
            <Box sx={{justifySelf: 'end', border: 1, p: 1, borderRadius: 2}} className='cursor-default w-fit'>
              <Typography variant='subtitle2' fontWeight={'bold'}>
                @ {postDetails[0].username}
              </Typography>
            </Box>
          </Box>
        </Container>
      }
    </div>
  )
}

export default PostDetails