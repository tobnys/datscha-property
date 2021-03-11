import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Component imports
import Properties from "./Properties";

export default function App() {
  // Global states
  const [bearer, setBearer] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState([]);

  // Form value states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function authenticateUser() {
    const res = await fetch(
      "https://datscha-fe-code-test-api.azurewebsites.net/login",
      {
        method: "POST",
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

    const json = await res.json();

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

  async function fetchProperties() {
    const res = await fetch(
      "https://datscha-fe-code-test-api.azurewebsites.net/properties",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${bearer}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

    const json = await res.json();

    if (!res.ok) {
      if(json.message) {
        setError(json.message);
      } else {
        setError(`An error occurred: ${res.statusText}`);
      }
    } else {
      setProperties(json);
    }
  }

  useEffect(() => {
    // If authenticated, fetch properties
    if(bearer) {
      fetchProperties();
    }
  }, [bearer])

  return (
    <div>
      {bearer ? (
        // Authenticated
        <Properties properties={properties} />
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

          {error && <ErrorTitle>{error}</ErrorTitle>}

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

const ErrorTitle = styled.h4`
  font-size: 14px;
  color: #aa3535;
  text-align: left;
  font-weight: bold;
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