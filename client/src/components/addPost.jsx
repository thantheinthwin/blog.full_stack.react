import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import { addPost } from '../api/post';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [{user}, dispatch] = useStateValue();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title: '',
        content: ''
    })

    const handleChange = (e) => {
        const newdata = { ...postData }
        newdata[e.target.id] = e.target.value
        setPostData(newdata)
    }

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        const inputData = { user_id: user.id, ...postData}
        addPost(inputData)
        .then((res) => {
            handleOpenSnackBar();
            setMessage(res);
        })
        .catch((e) => {
            setError(true);
            handleOpenSnackBar();
            setMessage(e);
        })
    }

    // Message
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    
    const handleOpenSnackBar = () => {
        setSnackBarOpen(true);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        if ( error === false ){
            navigate(0, {replace: true});
        }

        setSnackBarOpen(false);
        setError(false);
    };

  return (
    <Box sx={{display: 'grid', gap: 2}}>
        <Box sx={{display: 'flex'}}>
            <TextField label={'Title'} id='title' size='small' value={postData.title} onChange={(e)=>handleChange(e)}/>
        </Box>
        <TextField label={'Content'} id='content' multiline rows={5} value={postData.content} onChange={(e)=>handleChange(e)}></TextField>
        <Button className='w-fit justify-self-end' variant='outlined' onClick={handleSubmit}>Upload</Button>
        
        {/* Feedback Message For Users */}
        {
          error 
          ? 
          <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
          :
          <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        }
    </Box>
  )
}

export default AddPost