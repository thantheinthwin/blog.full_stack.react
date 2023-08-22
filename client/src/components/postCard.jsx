import { Button, Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PostDetails from './postDetails';

const PostCard = ({post, user}) => {
  const location = window.location.href.split('/');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Card sx={{ width: 1, height: 1}}>
      <CardContent sx={{display: 'grid', gap: 1}}>
        <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
          {post.title}
          {
            (user.id == post.user_id && location.some(path => path == 'myposts')) && <Button onClick={handleClickOpen} sx={{color: 'common.black'}}><MoreHorizOutlinedIcon/></Button> 
          }
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <PostDetails post={post} open={open} handleClose={handleClose}/>
    </Card>
  )
}

export default PostCard