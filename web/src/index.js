import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';

ReactDOM.render(
  <>
    <ColorModeScript />
    <App />
  </>,
  document.getElementById('root')
);
