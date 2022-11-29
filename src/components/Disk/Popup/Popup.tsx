import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../../actions/file';
import { AppDispatchType } from '../../../pages/SingIn';
import { setPopupDisplay } from '../../../redux/file/slice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const Popup: FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const popupDisplay = useSelector((state: any) => state.files.popupDisplay);
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const [dirName, setDirName] = React.useState('');

  const handleClose = () => dispatch(setPopupDisplay(false));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirName(event.target.value);
  };
  const createDirHandler = () => {
    dispatch(createDir(currentDir, dirName));
    setDirName('');
    dispatch(setPopupDisplay(false));
  };

  return (
    <Modal
      open={popupDisplay}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography sx={{ mb: 3 }} id="modal-modal-title" variant="h6" component="h2">
          Создать новую папку
        </Typography>
        <TextField
          value={dirName}
          onChange={handleChange}
          sx={{ minWidth: '100%', mb: 2 }}
          label="Название папки"
        />
        <Button sx={{ minWidth: '100%' }} onClick={createDirHandler}>
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default Popup;
