import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './Layout';
import store from './store';
import './App.scss';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Layout />
      </Provider>
    </ThemeProvider>
  );
}
