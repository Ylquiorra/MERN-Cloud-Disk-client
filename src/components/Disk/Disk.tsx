import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import { getFiles, uploadFile } from '../../actions/file';
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

  const fileUploadHandler = (e: any) => {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 9 }}>
        {currentDir && (
          <Button onClick={backClickHandler} sx={{ mr: 3 }} variant="outlined">
            Назад
          </Button>
        )}
        <Button onClick={showPopup} sx={{ mr: 3 }} variant="contained">
          Создать папку
        </Button>
        <Button color="secondary" variant="outlined" component="label">
          Загрузить файл
          <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" hidden />
        </Button>
        <Popup />
      </Box>
      <FileList />
    </>
  );
};

export default Disk;
