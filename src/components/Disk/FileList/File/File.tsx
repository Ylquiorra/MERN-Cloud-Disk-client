import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { IFile } from '../FileList';
import { setCurrentDir, setPushToStack } from '../../../../redux/file/slice';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';
import { Box } from '@mui/system';

//@ts-ignore
export const File: FC<IFile> = ({ name, type, size, path, date, user, childs, __v, _id }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const fileView: string = useSelector((state: any) => state.files.view);
  const file: IFile = { name, type, size, path, date, user, childs, __v, _id, currentDir };

  const openDirHandler = () => {
    if (type === 'dir') {
      dispatch(setPushToStack(currentDir));
      dispatch(setCurrentDir(_id));
    }
  };
  const downloadClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const deleteClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    // @ts-ignore
    dispatch(deleteFile(file));
  };

  if (fileView === 'list') {
    return (
      <Grid
        container
        onClick={openDirHandler}
        spacing={2}
        alignItems="center"
        sx={{ mb: 5, borderBottom: 1, borderColor: 'grey.500', cursor: 'pointer' }}>
        <Grid sx={{ textAlign: 'center' }} xs={1}>
          {type !== 'dir' ? (
            <InsertDriveFileIcon color="primary" sx={{ height: 50, width: 50 }} />
          ) : (
            <FolderIcon color="primary" sx={{ height: 50, width: 50 }} />
          )}
        </Grid>
        <Grid sx={{ wordWrap: 'break-word' }} xs>
          {name}
        </Grid>
        <Grid sx={{ textAlign: 'center' }} xs={1}>
          {type !== 'dir' ? (
            <CloudDownloadIcon
              onClick={(e) => downloadClickHandler(e)}
              color="primary"
              sx={{
                height: 50,
                width: 50,
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            />
          ) : (
            ''
          )}
        </Grid>
        <Grid sx={{ textAlign: 'center' }} xs={1}>
          <DeleteIcon
            onClick={(e) => deleteClickHandler(e)}
            color="primary"
            sx={{
              height: 50,
              width: 50,
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Grid>
        <Grid sx={{ textAlign: 'center' }} xs={1}>
          {date.slice(0, 10)}
        </Grid>
        <Grid sx={{ textAlign: 'center' }} xs={1}>
          {sizeFormat(size)}
        </Grid>
      </Grid>
    );
  }
  if (fileView === 'plate') {
    return (
      <Box sx={{ textAlign: 'center', width: '250px', cursor: 'pointer' }} onClick={openDirHandler}>
        {type !== 'dir' ? (
          <InsertDriveFileIcon color="primary" sx={{ height: 100, width: 100, mb: 1 }} />
        ) : (
          <FolderIcon color="primary" sx={{ height: 100, width: 100, mb: 1 }} />
        )}
        <Typography
          sx={{ mb: 2, wordWrap: 'break-word', maxWidth: '200px', margin: '0 auto' }}
          component="p"
          variant="h6">
          {name}
        </Typography>
        <Box>
          {type !== 'dir' ? (
            <CloudDownloadIcon
              onClick={(e) => downloadClickHandler(e)}
              color="primary"
              sx={{
                height: 50,
                width: 50,
                mr: 3,
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            />
          ) : (
            ''
          )}
          <DeleteIcon
            onClick={(e) => deleteClickHandler(e)}
            color="primary"
            sx={{
              height: 50,
              width: 50,
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Box>
      </Box>

      // <Grid
      //   container

      //   spacing={2}
      //   alignItems="center"
      //   sx={{ mb: 5, borderBottom: 1, borderColor: 'grey.500', cursor: 'pointer' }}>
      //   <Grid sx={{ textAlign: 'center' }} xs={1}>

      //   </Grid>
      //   <Grid xs>{name}</Grid>
      //   <Box>
      //     <Grid sx={{ textAlign: 'center' }} xs={1}>

      //     </Grid>
      //     <Grid sx={{ textAlign: 'center' }} xs={1}>

      //     </Grid>
      //   </Box>
      // </Grid>
    );
  }
};
