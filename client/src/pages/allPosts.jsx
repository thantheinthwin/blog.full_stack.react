import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { PostCardsContainer } from '../components'
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../api/post';
import { actionType } from '../context/reducer';
import { validateUser } from '../api/auth';

const AllPosts = () => {
    const [{user, allPosts}, dispatch] = useStateValue();
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

        if(!user){
          validateUser()
          .then(res => {
            dispatch({
              type: actionType.SET_USER,
              user: JSON.parse(res)?.user
            })
          })
          .catch(err => {
            navigate("/", {replace: true})
          })
        }
      }, [])

  return (
    <Container maxWidth='xl' sx={{mt: 2, py: 2, border: 1, borderRadius: 2, borderColor: 'grey.300'}} className='shadow-inner'>
      <PostCardsContainer Posts={allPosts}/>
    </Container>
  )
}

export default AllPosts