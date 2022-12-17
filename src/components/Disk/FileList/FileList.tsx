import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
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
//@ts-ignore
const FileList: FC = () => {
  const files: IFile[] = useSelector((state: any) => state.files.files);
  const fileView: string = useSelector((state: any) => state.files.view);

  if (files.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Typography component="h4" variant="h5">
          Папка пуста
        </Typography>
      </Box>
    );
  }

  if (fileView === 'list') {
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
              <File {...file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Box>
    );
  }
  if (fileView === 'plate') {
    return (
      <Box sx={{ display: 'flex', mb: 6, flexWrap: 'wrap', rowGap: 4 }}>
        {files.map((file) => (
          <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
            <File {...file} />
          </CSSTransition>
        ))}
      </Box>
    );
  }
};

export default FileList;
