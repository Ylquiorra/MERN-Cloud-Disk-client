import axios from 'axios';
import { AppDispatchType } from '../pages/SingIn';
import { setUser } from '../redux/user/slice';

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/registration', {
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
      const response = await axios.post('http://localhost:5000/api/auth/login', {
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
    try {
      const response = await axios.get('http://localhost:5000/api/auth/auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert('Произошла ошибка при автоматической авторизации');
      // localStorage.removeItem('token');
    }
  };
};
