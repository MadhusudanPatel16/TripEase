import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux-config/StoreRedux.js';

import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <Provider store={store}>
    <App />
     </Provider>


);

