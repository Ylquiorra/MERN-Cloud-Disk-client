import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import UploaderFile from './UploaderFile/UploaderFile';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setHideUploader } from '../../../redux/upload/slice';

export interface IUploadFile {
  id: string;
  name: string;
  progress: number;
}

const Uploader: FC = () => {
  const isVisible = useSelector((state: any) => state.upload.isVisible);
  const files: IUploadFile[] = useSelector((state: any) => state.upload.files);
  const dispatch = useDispatch();

  return (
    isVisible && (
      <Box
        sx={{
          overflowY: 'auto',
          width: 300,
          height: 300,
          backgroundColor: '#fff',
          border: '2px solid',
          borderColor: 'primary.main',
          padding: 2,
          position: 'fixed',
          bottom: 0,
          right: 0,
          borderRadius: 2,
        }}>
        <Stack sx={{ mb: 2 }} direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Загрузки</Typography>
          <CloseIcon onClick={() => dispatch(setHideUploader())} sx={{ cursor: 'pointer' }} />
        </Stack>
        {(files as IUploadFile[]).map((file) => (
          <UploaderFile key={file.id} {...file} />
        ))}
      </Box>
    )
  );
};

export default Uploader;
