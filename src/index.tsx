import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/ErrorMessage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
