import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';

export const MainLayout: FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 7 }}>
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Cloud Disk
              </Typography>
              <Button variant="outlined" sx={{ color: '#fff' }}>
                Выход
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};
