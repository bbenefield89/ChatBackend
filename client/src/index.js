import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import Global from './components/Global/Global'

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Global>
      <App />
    </Global>
  </BrowserRouter>,
  document.getElementById('root')
)
