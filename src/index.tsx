import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { App } from './App';
import { store } from './redux/store';
import { indigo, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: blue,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <CssBaseline>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </CssBaseline>
  </Provider>,
);
