import React, { useEffect } from 'react'
import { Navbar} from '../components'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { validateUser } from '../api/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AllPosts from './allPosts';
import MyPosts from './myPosts';

const Home = () => {
  const [{user}, dispatch] = useStateValue();
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

  const routes = [
    {
      path: '/',
      element: <AllPosts/>
    },
    {
      path: '/myposts',
      element: <MyPosts/>
    }
  ]

  return (
    <>
        <Navbar user={user} dispatch={dispatch}/>
        <Routes>
          {
            routes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element}/>
            ))
          }
        </Routes>
    </>  
  )
}

export default Home