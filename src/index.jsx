import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: rgb(6,10,11);
    background: linear-gradient(360deg, rgba(6,10,11,1) 25%, rgba(36,43,52,1) 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();