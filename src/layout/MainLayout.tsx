import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Navbar } from '../components/Navbar/Navbar';

export const MainLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};
