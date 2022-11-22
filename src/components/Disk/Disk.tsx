import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import { getFiles } from '../../actions/file';
import FileList from './FileList/FileList';

const Disk: FC = () => {
  const dispatch: any = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);

  React.useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 9 }}>
        <Button sx={{ mr: 3 }} variant="outlined">
          Назад
        </Button>
        <Button variant="contained">Создать папку</Button>
      </Box>
      <FileList />
    </>
  );
};

export default Disk;
