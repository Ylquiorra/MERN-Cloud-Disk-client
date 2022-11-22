import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import { File } from './File/File';

export interface IFile {
  _id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  date: string;
  user: string;
  chields: Array<string>;
  __v: number;
  currentDir: string | null;
}

const FileList: FC = () => {
  const files: IFile[] = useSelector((state: any) => state.files.files);

  return (
    <Box sx={{ flexGrow: 1, mb: 6 }}>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid xs={1}></Grid>
        <Grid xs>Название</Grid>
        <Grid  xs={1}></Grid>
        <Grid xs={1}></Grid>
        <Grid sx={{ textAlign: 'center' }} xs={1}>Дата</Grid>
        <Grid sx={{ textAlign: 'center' }} xs={1}>Размер</Grid>
      </Grid>
      {files.map((file) => (
        <File key={file._id} {...file} />
      ))}
    </Box>
  );
};

export default FileList;
