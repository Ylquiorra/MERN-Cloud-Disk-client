import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useSelector } from 'react-redux';
import { File } from './File/File';
import './fileList.css';

export interface IFile {
  _id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  date: string;
  user: string;
  childs: Array<string>;
  __v: number;
  currentDir: string | null;
}

const FileList: FC = () => {
  const files: IFile[] = useSelector((state: any) => state.files.files);

  return (
    <Box sx={{ flexGrow: 1, mb: 6 }}>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid xs={1}></Grid>
        <Grid sx={{ fontWeight: '600', fontSize: 20 }} xs>
          Название
        </Grid>
        <Grid xs={1}></Grid>
        <Grid xs={1}></Grid>
        <Grid sx={{ textAlign: 'center', fontWeight: '600', fontSize: 20 }} xs={1}>
          Дата
        </Grid>
        <Grid sx={{ textAlign: 'center', fontWeight: '600', fontSize: 20 }} xs={1}>
          Размер
        </Grid>
      </Grid>
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
            <File key={file._id} {...file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Box>
  );
};

export default FileList;
