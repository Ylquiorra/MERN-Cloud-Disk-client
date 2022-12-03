import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setRemoveUploadFile } from '../../../../redux/upload/slice';
import { IUploadFile } from '../Uploader';

const UploaderFile: FC<IUploadFile> = ({ id, name, progress }) => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        borderRadius: 1,
        padding: 1,
        mb: 2,
      }}>
      <Stack sx={{ mb: '2' }} direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ color: '#fff' }}>{name}</Typography>
        <CloseIcon
          onClick={() => dispatch(setRemoveUploadFile(id))}
          sx={{ cursor: 'pointer', color: '#fff' }}
        />
      </Stack>
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
          }}></Box>
        <Box
          sx={{
            top: '0',
            position: 'absolute',
            backgroundColor: '#4caf50',
            borderRadius: 1,
            width: `${progress}%`,
            height: 24,
          }}></Box>
        <Typography
          sx={{ zIndex: 3, textAlign: 'center', position: 'absolute', top: '10%', left: '46%' }}>
          {`${progress} %`}
        </Typography>
      </Box>
    </Box>
  );
};

export default UploaderFile;
