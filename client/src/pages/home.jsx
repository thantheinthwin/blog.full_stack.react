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