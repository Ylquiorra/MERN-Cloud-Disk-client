import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { auth } from './actions/user';
import { MainLayout } from './layout/MainLayout';

import { SingIn } from './pages/SingIn';
import { SingUp } from './pages/SingUp';

export const App: FC = () => {
  const dispach = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispach(auth() as any); // any
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/login" element={<SingIn />} />
        <Route path="/register" element={<SingUp />} />
      </Route>
    </Routes>
  );
};
