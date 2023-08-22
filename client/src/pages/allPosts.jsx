import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { PostCard } from '../components'
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../api/post';
import { actionType } from '../context/reducer';

const AllPosts = () => {
    const [{allPosts}, dispatch] = useStateValue();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!allPosts){
          getAllPosts()
          .then(res => {
            dispatch({
              type: actionType.SET_ALL_POST,
              allPosts: res
            })
          })
        }
      }, [allPosts])

  return (
    <Container maxWidth='xl' sx={{bgcolor: 'grey.200', py: 2}}>
        <Grid container spacing={2}>
        {
            allPosts &&
            allPosts.map((post, i) => (
            <Grid item xs={3} key={i}>
                <PostCard title={post.title} content={post.content}/>                  
            </Grid>
            ))
        }
        </Grid>
    </Container>
  )
}

export default AllPosts