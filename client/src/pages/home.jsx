import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Navbar, PostCard } from '../components'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { validateUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../api/post';

const Home = () => {
  const [{user, allPosts}, dispatch] = useStateValue();
  const navigate = useNavigate();

  // JWT Token validation stored in cookies
  useEffect(()=>{
    if(!user){
      validateUser()
      .then(res => {
        dispatch({
          type: actionType.SET_USER,
          user: JSON.parse(res)?.user
        })
      })

      // reroute the user back to login if not logged in
      .catch(err =>{
        // console.log(err);
        navigate("/", {replace: true})
      })
    }
  },[])

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
    <>
        <Navbar user={user} dispatch={dispatch}/>
        <Container maxWidth='xl' sx={{bgcolor: 'grey.200', py: 2}}>
          <Grid container spacing={2}>
            {
              allPosts &&
              allPosts.map((post, i) => (
                <Grid item>
                  <PostCard title={post.title} content={post.content} key={i}/>                  
                </Grid>
              ))
            }
          </Grid>
        </Container>
    </>  
  )
}

export default Home