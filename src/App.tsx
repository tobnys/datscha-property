import React from 'react';
import styled from 'styled-components'

export default function App() {
  return (
    <div>
      <LoginBox>
        <MainTitle>Login</MainTitle>
        <ButtonWrapper>
          <LoginButton>Login</LoginButton>
        </ButtonWrapper>

        <ButtonWrapper>
          <SignOutButton disabled >Logout</SignOutButton>
        </ButtonWrapper>
      </LoginBox>
    </div>
  );
}

const LoginButton = styled.button`
  background: linear-gradient(312deg,#3f92d6 30%, rgb(63, 146, 214)  90%);
  box-shadow: 0 3px 5px 2px rgba(54, 150, 167, 0.1);
  border: 0;
  border-radius: 5px;
  height: 40px;
  font-size: 12px;
  font-weight: bold;
  color: white;
`

const SignOutButton = styled(LoginButton)`
  background: linear-gradient(312deg,#d63f6c 20%, #a14a65  90%);
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const MainTitle = styled.h3`
  font-size: 24px;
  color: white;
  text-align: center;
  font-weight: bold;
  padding-bottom: 45px;
`

const LoginBox = styled.div`
  width: 300px;
  background-color: #242b33;
  padding: 45px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`