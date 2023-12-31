import { Box, Grid, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostCard from './postCard'

const PostCardsContainer = ({Posts, user}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const postsPerPage = 6;

  const handleChange = (err, page) => {
    setCurrentPage(page)
  }

  useEffect(()=>{
    if(Posts){
      setTotalPage(Math.ceil(Posts.length / postsPerPage))
    }
  },[Posts])

  return (
    <>
    <Grid container spacing={2}>
    {
        Posts && (
        Posts
        .slice((currentPage-1)*postsPerPage, (currentPage-1)*postsPerPage+postsPerPage)
        .map((post, i) => (
        <Grid item xs={4} key={i}>
            <PostCard post={post} user={user}/>                  
        </Grid>
        ))
        )
    }
    </Grid>
    {
      totalPage &&
      <Box sx={{mt: 2}}>
        <Pagination count={totalPage} shape="rounded" onChange={handleChange}/>
      </Box>
    }
    </>
  )
}

export default PostCardsContainer