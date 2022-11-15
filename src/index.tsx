import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { App } from './App';
import { store } from './redux/store';
const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
