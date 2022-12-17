import React from 'react';
import { Box, AppBar, Container, Toolbar, Typography, Button, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudIcon from '@mui/icons-material/Cloud';
import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import { AppDispatchType } from '../../pages/SingIn';
import { setLogout } from '../../redux/user/slice';

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const isAuth: boolean = useSelector((state: any) => state.user.isAuth);
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const avatar = currentUser.avatar ? (
    <Avatar alt="Avatar" src={`${API_URL + currentUser.avatar}`} />
  ) : (
    <Avatar>
      <AccountCircleIcon sx={{ height: 40, width: 40 }} />
    </Avatar>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 7 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignItems: 'center' }}>
              <Link to="/">
                <CloudIcon sx={{ color: '#fff', height: 40, width: 40 }} />
              </Link>
            </Typography>
            <Button
              onClick={() => dispatch(setLogout())}
              variant="outlined"
              sx={{ color: '#fff', mr: 2 }}>
              Выход
            </Button>
            {isAuth && <Link to="profile">{avatar}</Link>}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
