import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { deleteAvatar, uploadAvatar } from '../actions/user';
import { AppDispatchType } from './SingIn';
import { API_URL } from '../config';

const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const currentUser = useSelector((state: any) => state.user.currentUser);
  console.log(currentUser);
  const avatar = currentUser.avatar ? (
    <Avatar
      sx={{ height: 200, width: 200, mb: 3 }}
      alt="Avatar"
      src={`${API_URL + currentUser.avatar}`}
    />
  ) : (
    <Avatar sx={{ height: 200, width: 200, mb: 3 }}>
      <AccountCircleIcon sx={{ height: 200, width: 200 }} />
    </Avatar>
  );

  const changeUploadAvatarHandler = (e: any) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {avatar}
      <Typography sx={{ mb: 4 }} variant="h6" component="div">
        {currentUser.firstName} {currentUser.lastName}
      </Typography>
      <Box>
        <Button onClick={() => dispatch(deleteAvatar())} sx={{ mr: 3 }} variant="contained">
          Удалить аватар
        </Button>
        <Button
          onChange={(e) => changeUploadAvatarHandler(e)}
          color="secondary"
          variant="outlined"
          component="label">
          Загрузить аватар
          <input accept="image/*" multiple={true} type="file" hidden />
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
