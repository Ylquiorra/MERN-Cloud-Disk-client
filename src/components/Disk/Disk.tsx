import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { getFiles, uploadFile } from '../../actions/file';
import FileList, { IFile } from './FileList/FileList';
import Popup from './Popup/Popup';
import { setCurrentDir, setPopupDisplay } from '../../redux/file/slice';

const Disk: FC = () => {
  const [dragEnter, setDragEnter] = React.useState(false);
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

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const DropHandle = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  return !dragEnter ? (
    <section
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      className="disk">
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
    </section>
  ) : (
    <section
      onDrop={DropHandle}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      className="drop-area">
      <Box
        sx={{
          flexGrow: 1,
          height: '75vh',
          border: '2px #9c27b0 dashed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Перетащите файлы в область 
        </Typography>
        <CloudUploadIcon sx={{ height: 50, width: 50 }} />
      </Box>
    </section>
  );
};

export default Disk;
