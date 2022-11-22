import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { setFiles } from '../redux/file/slice';

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
