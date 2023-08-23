import React from 'react'
import { Navbar} from '../components'
import { Route, Routes } from 'react-router-dom';
import AllPosts from './allPosts';
import MyPosts from './myPosts';

const Home = () => {
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
        <Navbar/>
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