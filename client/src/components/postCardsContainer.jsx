import { Grid } from '@mui/material'
import React from 'react'
import PostCard from './postCard'

const PostCardsContainer = ({Posts, user}) => {
  return (
    <Grid container spacing={2}>
    {
        Posts &&
        Posts.map((post, i) => (
        <Grid item xs={3} key={i}>
            <PostCard title={post.title} content={post.content}/>                  
        </Grid>
        ))
    }
    </Grid>
  )
}

export default PostCardsContainer