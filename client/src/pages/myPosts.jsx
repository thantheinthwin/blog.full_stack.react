import { Box, Container, Grid } from '@mui/material'
import React from 'react'

const MyPosts = () => {
  return (
    <Container maxWidth='xl' sx={{bgcolor: 'grey.200', py: 2}}>
      <Box display={'flex'}>
        <Grid width={4/5}>
          1
        </Grid>
        <Box sx={{ bgcolor: 'grey.100', width: 1/5, borderRadius: 1 }} className="shadow-md">
          2
        </Box>
      </Box>
    </Container>
  )
}

export default MyPosts