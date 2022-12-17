import axios from 'axios';
import { IFile } from '../components/Disk/FileList/FileList';

import { API_URL } from '../config';
import { AppDispatchType } from '../pages/SingIn';
import { setUser } from '../redux/user/slice';

export const registration = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/registration`, {
      firstName,
      lastName,
      email,
      password,
    });
    alert(response.data.message);
  } catch (error) {
    alert('Произошла ошибка при регистрации');
  }
};

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatchType) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert('Произошла ошибка при авторизации');
    }
  };
};

export const auth = () => {
  return async (dispatch: AppDispatchType) => {
    if (typeof (localStorage.getItem('token') === 'undefined')) {
      try {
        const response = await axios.get(`${API_URL}api/auth/auth`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        dispatch(setUser(response.data.user));
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        alert('Произошла ошибка при автоматической авторизации');
      }
    }
  };
};

export const uploadAvatar = (file: IFile) => {
  return async (dispatch: AppDispatchType) => {
    try {
      const formData = new FormData();
      // @ts-ignore
      formData.append('file', file);
      const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch: AppDispatchType) => {
    try {
      const response = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
};
