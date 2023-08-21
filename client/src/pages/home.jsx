import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Navbar } from '../components'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Container maxWidth='false'>
            Posts
        </Container>
    </>  
  )
}

export default Home