import React, { useState } from "react";
import styled from "styled-components";

export default function App() {
  // Global states
  const [bearer, setBearer] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  // Form value states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function authenticateUser() {
    const res = await fetch(
      "https://datscha-fe-code-test-api.azurewebsites.net/login",
      {
        method: "post",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

    console.log("RES", res);

    const json = await res.json();
    console.log("JSON", json);

    if (!res.ok) {
      if(json.message) {
        setError(json.message);
      } else {
        setError(`An error occurred: ${res.statusText}`);
      }
    } else {
      setBearer(json.token);
    }
  }

  return (
    <div>
      {bearer ? (
        // Authenticated
        <LoginBox>
          <MainTitle>Authenticated</MainTitle>
        </LoginBox>
      ) : (
        // Not authenticated
        <LoginBox>
          <MainTitle>Login</MainTitle>

          <FormWrapper>
            <RowWrapper>
              <StyledInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </RowWrapper>

            <RowWrapper>
              <StyledInput placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </RowWrapper>
          </FormWrapper>

          <RowWrapper>
            <LoginButton onClick={() => authenticateUser()}>Login</LoginButton>
          </RowWrapper>
        </LoginBox>
      )}
    </div>
  );
}

const StyledInput = styled.input`
  display: flex;
  flex-direction: column;
  border: 0;
  border-radius: 5px;
  height: 30px;
  padding: 5px 10px;
`

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

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const FormWrapper = styled.div`
  margin-bottom: 20px;
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