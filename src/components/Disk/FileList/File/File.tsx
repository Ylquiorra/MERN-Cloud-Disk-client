import React, { FC } from 'react';
import { Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

import { IFile } from '../FileList';

export const File: FC<IFile> = ({
  name,
  type,
  size,
  path,
  date,
  user,
  chields,
  __v,
  currentDir,
}) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ mb: 5, borderBottom: 1, borderColor: 'grey.500' }}>
      <Grid sx={{ textAlign: 'center' }} sm={1}>
        <FolderIcon sx={{ height: 50, width: 50 }} />
      </Grid>
      <Grid sm>{name}</Grid>
      <Grid sx={{ textAlign: 'center' }} sm={1}></Grid>
      <Grid sx={{ textAlign: 'center' }} sm={1}></Grid>
      <Grid sx={{ textAlign: 'center' }} sm={1}>
        {date.slice(0, 10)}
      </Grid>
      <Grid sx={{ textAlign: 'center' }} sm={1}>
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
