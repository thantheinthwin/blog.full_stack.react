import { Box, Container, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { AddPost, PostCardsContainer } from '../components';
import { useStateValue } from '../context/StateProvider';
import { getAllPosts } from '../api/post';
import { actionType } from '../context/reducer';
import { validateUser } from '../api/auth';

const MyPosts = () => {
  const [tab, setTab] = useState("myPosts");
  const [{user, allPosts}, dispatch] = useStateValue();
  const [myPosts, setMyPosts] = useState(null);

  const handleChange = (event, nextTab) => {
    setTab(nextTab);
  }

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

    if(!user){
      validateUser()
      .then(res => {
        dispatch({
          type: actionType.SET_USER,
          user: JSON.parse(res)?.user
        })
      })
      .catch(err => {
        return null;
      })
    }
  }, [allPosts])


  useEffect(()=>{
    if(allPosts && user){
      setMyPosts(allPosts.filter(post => post.user_id === user.id))
    }
  },[allPosts, user])

  return (
    <Container maxWidth="xl" sx={{ py: 2, mt: 2, border: 1, borderRadius: 2, borderColor: 'grey.400', boxShadow: 1 }}>
      <Box display={"flex"} gap={2}>
        <Box minWidth={1/6}>
          <ToggleButtonGroup 
            exclusive 
            value={tab}
            orientation="vertical"
            onChange={handleChange}
            fullWidth
          >
            <ToggleButton value={'myPosts'} sx={{display: 'flex', gap: 2}}>
              <ArticleOutlinedIcon fontSize="medium" />
              <Typography variant="subtitle2">My Posts</Typography>
            </ToggleButton>
            <ToggleButton value={'addPost'} sx={{display: 'flex', gap: 2}}>
              <PostAddOutlinedIcon fontSize="medium" />
              <Typography variant="subtitle2">Add Post</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Grid flexGrow={1} border={1} borderColor={'grey.300'} borderRadius={1} p={2} className='shadow-inner'>
          {
            tab === 'myPosts' 
            ? <PostCardsContainer Posts={myPosts} user={user}/>
            : <AddPost/>
          }
        </Grid>
      </Box>
    </Container>
  );
}

export default MyPosts