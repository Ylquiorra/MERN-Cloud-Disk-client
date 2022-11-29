import axios from 'axios';
import { Action, AnyAction, Dispatch } from 'redux';

import { IFile } from '../components/Disk/FileList/FileList';
import { setAddFile, setFiles } from '../redux/file/slice';

export function getFiles(dirId: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      //TODO нужно всписать тип, что получает
      const { data } = await axios.get(
        `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      );
      dispatch(setFiles(data));
    } catch (error: any) {
      alert(error.message);
    }
  };
}

export function createDir(dirId: string, name: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/files`,
        {
          name,
          parent: dirId,
          type: 'dir',
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      dispatch(setAddFile(data));
    } catch (error: any) {
      alert(error.message);
    }
  };
}
//TODO изменить тип file
export function uploadFile(file: any, dirId: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
        formData.append('parent', dirId);
      }
      const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setAddFile(response.data));
    } catch (error: any) {
      alert(error.message);
    }
  };
}
