import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Navbar, PostCard } from '../components'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Container maxWidth='false'>
            <PostCard/>
        </Container>
    </>  
  )
}

export default Home