import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import { getFiles } from '../../actions/file';
import FileList from './FileList/FileList';
import Popup from './Popup/Popup';
import { setCurrentDir, setPopupDisplay } from '../../redux/file/slice';

const Disk: FC = () => {
  const dispatch: any = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const dirStack = useSelector((state: any) => state.files.dirStack);

  React.useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  const showPopup = () => {
    dispatch(setPopupDisplay(true));
  };

  const backClickHandler = () => {
    dispatch(setCurrentDir(dirStack.pop()));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 9 }}>
        {currentDir && (
          <Button onClick={backClickHandler} sx={{ mr: 3 }} variant="outlined">
            Назад
          </Button>
        )}
        <Button onClick={showPopup} variant="contained">
          Создать папку
        </Button>
        <Popup />
      </Box>
      <FileList />
    </>
  );
};

export default Disk;
