import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

import { getFiles, searchFiles, uploadFile } from '../../actions/file';
import FileList from './FileList/FileList';
import Popup from './Popup/Popup';
import { setCurrentDir, setFilesView, setPopupDisplay } from '../../redux/file/slice';
import Uploader from './Uploader/Uploader';
import UsedStorage from './UsedStorage/UsedStorage';

const Disk: FC = () => {
  const [dragEnter, setDragEnter] = React.useState(false);
  const [sort, setSort] = React.useState('name');
  const [searchName, setSearchName] = React.useState('');
  const [searchTimeout, setSearchTimeout] = React.useState(false);

  const dispatch: any = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const dirStack = useSelector((state: any) => state.files.dirStack);
  const loader = useSelector((state: any) => state.app.loader);

  React.useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

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

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      //@ts-ignore
      clearTimeout(searchTimeout);
    }
    if (e.target.value !== '') {
      setSearchTimeout(
        //@ts-ignore
        setTimeout(
          (value: string) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value,
        ),
      );
    } else {
      //@ts-ignore
      dispatch(getFiles(currentDir));
    }
  };

  if (loader) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}
        className="loader">
        <CircularProgress />
      </Box>
    );
  }

  return !dragEnter ? (
    <section
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      className="disk">
      <Box
        sx={{
          display: 'dlex',
          alingItems: 'center',
          justifyContent: 'space-between',
          mb: 9,
        }}>
        <Box>
          {currentDir && (
            <Button onClick={backClickHandler} sx={{ mr: 3 }} variant="outlined">
              Назад
            </Button>
          )}
          <Button onClick={showPopup} sx={{ mr: 3 }} variant="contained">
            Создать папку
          </Button>
          <Button sx={{ mr: 5 }} color="secondary" variant="outlined" component="label">
            Загрузить файл
            <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" hidden />
          </Button>
          <Popup />
          <Uploader />
          <FormControl sx={{ marginRight: 5 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Сортировка
            </InputLabel>
            <NativeSelect onChange={(e) => setSort(e.target.value)} defaultValue={sort}>
              <option value="name">По имени</option>
              <option value="type">По типу</option>
              <option value="date">По дате</option>
            </NativeSelect>
          </FormControl>
          <TextField
            sx={{ mb: 3 }}
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            id="outlined-name"
            label="Введите, чтобы найти"
          />
          <UsedStorage />
        </Box>
        <Box>
          <GridViewOutlinedIcon
            sx={{ width: 36, height: 36, mr: 4, cursor: 'pointer' }}
            onClick={() => dispatch(setFilesView('plate'))}
          />
          <ListOutlinedIcon
            sx={{ width: 36, height: 36, cursor: 'pointer' }}
            onClick={() => dispatch(setFilesView('list'))}
          />
        </Box>
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
