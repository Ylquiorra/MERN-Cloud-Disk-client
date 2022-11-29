import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

import { IFile } from '../FileList';
import { setCurrentDir, setPushToStack } from '../../../../redux/file/slice';
import { log } from 'console';

export const File: FC<IFile> = ({ name, type, size, path, date, user, childs, __v, _id }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);

  const openDirHandler = () => {
    if (type === 'dir') {
      dispatch(setPushToStack(currentDir));
      dispatch(setCurrentDir(_id));
    }
  };

  return (
    <Grid
      container
      onClick={openDirHandler}
      spacing={2}
      alignItems="center"
      sx={{ mb: 5, borderBottom: 1, borderColor: 'grey.500', cursor: 'pointer' }}>
      <Grid sx={{ textAlign: 'center' }} xs={1}>
        <FolderIcon sx={{ height: 50, width: 50 }} />
      </Grid>
      <Grid xs>{name}</Grid>
      <Grid sx={{ textAlign: 'center' }} xs={1}></Grid>
      <Grid sx={{ textAlign: 'center' }} xs={1}></Grid>
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
