import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, updatePost } from '../api/post';
import { Alert, Box, Button, Container, Divider, Snackbar, TextField, Typography } from '@mui/material';
import DeleteConfirmDialog from './deleteConfirmDialog';
import { useStateValue } from '../context/StateProvider';
import { validateUser } from '../api/auth';
import { actionType } from '../context/reducer';
import { UpdateOutlined } from '@mui/icons-material';
import BlackButton from './BlackButton';

const PostDetails = () => {
  const {postId} = useParams();
  const navigate = useNavigate();

  const [{user}, dispatch] = useStateValue();

  const [postDetails, setPostDetails] = useState('');
  const [editPost, setEditPost] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  }

  const handleCloseConfirmDialog = () => {
      setOpenConfirmDialog(false);
  }

  useEffect(()=>{
    getPost(postId)
    .then((res) => {
      setPostDetails(res)
    })
    
    if(!user){
      validateUser()
      .then(res => {
        dispatch({
          type: actionType.SET_USER,
          user: JSON.parse(res)?.user
        })
      })
      .catch(err => {
        return null;
      })
    }
  },[])

  const handleEdit = () => {
    setEditPost(true);
  }

  const [postData, setPostData] = useState({
      title: '',
      content: ''
  })

  const handleChange = (e) => {
      const newdata = { ...postData }
      newdata[e.target.id] = e.target.value
      setPostData(newdata)
  }

  const handleSubmit = () => {
    const inputData = {...postData}
    if(inputData.title === ''){
      inputData.title = postDetails[0].title
    }
    if(inputData.content === ''){
      inputData.content = postDetails[0].content
    }
    
    updatePost(inputData, postId)
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

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

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
    <>
      {
        postDetails && 
        (!editPost ?
        <Container maxWidth='md' sx={{mt: 2, py: 2, border: 1, borderRadius: 2, borderColor: 'grey.300'}}>
          <Box display={'grid'} gap={2}>
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
              <Typography variant='h3'>{postDetails[0].title}</Typography>
              {
                user &&
                (user.id == postDetails[0].id &&
                <Box sx={{display: 'flex', alignItems: 'end', gap: 1}}>
                  <Button variant='outlined' className='h-fit w-fit' color='error' onClick={handleOpenConfirmDialog}>Delete</Button>
                  <Button variant='outlined' className='h-fit w-fit' onClick={handleEdit}>Edit</Button>
                </Box>
                )
              }
            </Box>
            <Divider/>
            <Typography variant='body1' textAlign={'justify'}>{postDetails[0].content}</Typography>
            <Box sx={{justifySelf: 'end', border: 1, p: 1, borderRadius: 2}} className='cursor-default w-fit'>
              <Typography variant='subtitle2' fontWeight={'bold'}>
                @ {postDetails[0].username}
              </Typography>
            </Box>
          </Box>
          <DeleteConfirmDialog open={openConfirmDialog} handleClose={handleCloseConfirmDialog} id={postId}/>
        </Container>
        :
        <Container maxWidth='md' sx={{mt: 2, py: 2, border: 1, borderRadius: 2, borderColor: 'grey.300'}}>
          <Box component={'form'} display={'grid'} gap={2} noValidate>
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
              <TextField id='title' label={"Title"} defaultValue={postDetails[0].title} size='small' onChange={(e) => handleChange(e)}></TextField>
              <Box sx={{border: 1, p: 1, borderRadius: 2}} className='cursor-default w-fit h-fit'>
                <Typography variant='subtitle2' fontWeight={'bold'}>
                  @ {postDetails[0].username}
                </Typography>
              </Box>
            </Box>
            <Divider/>
            <TextField id='content' label={"Content"} defaultValue={postDetails[0].content} multiline onChange={(e) => handleChange(e)}></TextField>
            <BlackButton label={"Update"} onClick={handleSubmit}><UpdateOutlined/></BlackButton>
          </Box>
          {/* Feedback Message For Users */}
          {
            error 
            ? 
            <Snackbar open={snackBarOpen} autoHideDuration={1500} onClose={handleCloseSnackBar}>
              <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
            :
            <Snackbar open={snackBarOpen} autoHideDuration={1500} onClose={handleCloseSnackBar}>
              <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          }
        </Container>
        )
      }
    </>
  )
}

export default PostDetails