import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { auth } from './actions/user';
import Disk from './components/Disk/Disk';
import { MainLayout } from './layout/MainLayout';
import Profile from './pages/Profile';
import { SingIn } from './pages/SingIn';
import { SingUp } from './pages/SingUp';

export const App: FC = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const isAuth: boolean = useSelector((state: any) => state.user.isAuth);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispach(auth() as any); // any
    }
  }, []);

  React.useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [isAuth]);

  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route path="/login" element={<SingIn />} />
          <Route path="/register" element={<SingUp />} />
        </>
      ) : (
        <Route path="" element={<MainLayout />}>
          <Route path="/" element={<Disk />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      )}
    </Routes>
  );
};
