import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouteSwitch from './RouteSwitch';
import store from './redux/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Provider store={store}>
            <RouteSwitch />
        </Provider>
  </React.StrictMode>
);
