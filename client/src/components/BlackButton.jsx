import { Button } from '@mui/material'
import React from 'react'

const BlackButton = ({label, onClick, children}) => {
  return (
    <Button 
    onClick={onClick}
    sx={{
        border: 1,
        borderColor: 'common.black', 
        color: 'common.black', 
        '&:hover': {
        color: 'common.white',
        bgcolor: 'common.black'
        }
    }}>{children}&nbsp;{label}</Button>
  )
}

export default BlackButton