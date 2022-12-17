import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { setRemoveUploadFile } from '../../../redux/upload/slice';
import { useSelector } from 'react-redux';
import sizeFormat from '../../../utils/sizeFormat';

const UsedStorage: FC = () => {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  let usedSorage = (currentUser.usedSpace * 100) / currentUser.diskSpace;
  return (
    <Box
      sx={{
        maxWidth: '350px',
        backgroundColor: 'primary.main',
        borderRadius: 1,
        padding: 1,
      }}>
      <Box
        sx={{
          position: 'relative',
        }}>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            width: '100%',
            height: 24,
            mb: 1,
          }}></Box>
        <Box
          sx={{
            top: '0',
            position: 'absolute',
            backgroundColor: '#4caf50',
            borderRadius: 1,
            width: `${usedSorage}%`,
            height: 24,
          }}></Box>
        <Typography
          sx={{
            zIndex: 3,
            textAlign: 'center',
            position: 'absolute',
            top: '4%',
            left: '46%',
          }}>
          {usedSorage.toFixed(2)} %
        </Typography>
        <Typography sx={{ color: '#fff' }}>
          Занято {sizeFormat(currentUser.usedSpace)} из {sizeFormat(currentUser.diskSpace)}
        </Typography>
      </Box>
    </Box>
  );
};

export default UsedStorage;
