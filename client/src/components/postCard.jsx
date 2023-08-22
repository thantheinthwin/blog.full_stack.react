import { Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'

const PostCard = ({title, content}) => {
  return (
    <Card sx={{ width: 1, height: 1}}>
        <CardContent sx={{display: 'grid', gap: 1}}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Divider/>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
    </Card>
  )
}

export default PostCard