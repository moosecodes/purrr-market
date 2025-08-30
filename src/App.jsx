import { Provider } from 'react-redux';
import Layout from './Layout';
import store from './store';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
