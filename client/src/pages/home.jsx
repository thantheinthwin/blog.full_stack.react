import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Navbar, PostCard } from '../components'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { validateUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [{user}, dispatch] = useStateValue();
  const navigate = useNavigate();

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

  return (
    <>
        <Navbar user={user} dispatch={dispatch}/>
        <Container maxWidth='false'>
            <PostCard/>
        </Container>
    </>  
  )
}

export default Home