import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Logout } from '@mui/icons-material'
import FeedIcon from '@mui/icons-material/Feed';
import React, { useState } from 'react'
import { logout } from '../api/auth';
import { actionType } from '../context/reducer';
import { useNavigate } from 'react-router-dom';

const Navbar = ({user, dispatch}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{px: 2}} className="shadow">
        <Typography display={'inline'} variant='h3'>Pandora</Typography>
        <Toolbar title="Account Setting">
            <IconButton 
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
            >
                <Avatar sx={{ width: 32, height: 32 }}>{user?.username.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
        </Toolbar>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <FeedIcon/>
            </ListItemIcon> 
            My Posts
            </MenuItem>
            <Divider />
            <MenuItem onClick={()=>{
                logout()
                .then(
                    dispatch({
                        type: actionType.SET_USER,
                        user: null
                    })
                )
                navigate("/", {replace: true});
            }}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
    </Box>
  )
}

export default Navbar