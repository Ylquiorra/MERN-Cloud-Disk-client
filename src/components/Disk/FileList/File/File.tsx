import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { IFile } from '../FileList';
import { setCurrentDir, setPushToStack } from '../../../../redux/file/slice';
import { deleteFile, downloadFile } from '../../../../actions/file';
import { AppDispatchType } from '../../../../pages/SingIn';

export const File: FC<IFile> = ({ name, type, size, path, date, user, childs, __v, _id }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
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
      <Grid xs>{name}</Grid>
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
        {size}
      </Grid>
    </Grid>
  );
};

// const File: FC<IFile> = ({ file }) => {
//   return (
//     <Grid container spacing={2} sx={{ mb: 4 }}>
//       <Grid xs={1}>
//         <FolderIcon />
//       </Grid>
//       <Grid xs>Название</Grid>
//       <Grid xs={1}></Grid>
//       <Grid xs={1}></Grid>
//       <Grid xs={1}>Дата</Grid>
//       <Grid xs={1}>Размер</Grid>
//     </Grid>
//   );
// };

// export default File;
