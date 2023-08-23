import { Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'

import { Link } from 'react-router-dom';

const PostCard = ({post}) => {  
  return (
    <Link to={`/post/${post.id}`}>
      <CardActionArea sx={{ width: 1, height: 1}}>
        <Card sx={{ width: 1, height: 1}}>
          <CardContent sx={{display: 'grid', gap: 1}}>
            <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
              {post.title}
            </Typography>
            <Divider/>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  )
}

export default PostCard