import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'

const PostCard = ({title, content}) => {
  return (
    <CardActionArea sx={{ height: 1 }}>
      <Card sx={{ maxWidth: 345, height: 1}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default PostCard