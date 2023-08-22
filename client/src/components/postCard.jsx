import { Button, Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const PostCard = ({post, user}) => {
  const location = window.location.href.split('/');
  
  return (
    <Card sx={{ width: 1, height: 1}}>
        <CardContent sx={{display: 'grid', gap: 1}}>
          <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
            {post.title}
            {
              (user.id == post.user_id && location.some(path => path == 'myposts')) && <Button sx={{}}><EditOutlinedIcon/></Button> 
            }
          </Typography>
          <Divider/>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
    </Card>
  )
}

export default PostCard