import React from 'react';

import styled, { createGlobalStyle } from 'styled-components'

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <LoginBox />
    </div>
  );
}

const LoginBox = styled.div`
  width: 300px;
  background-color: #242b33;
  padding: 45px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: rgb(6,10,11);
    background: linear-gradient(360deg, rgba(6,10,11,1) 25%, rgba(36,43,52,1) 100%);
    font-family: 'Manrope', sans-serif;
  }
`