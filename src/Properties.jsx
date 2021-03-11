import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropertyListItem from "./PropertyListItem";



export default function Properties({ properties }) {
  const [areaInterval, setAreaInterval] = useState([0, -1]);
  
  console.log("PROPERTIES", properties);
  return (
    <PropertiesContainer>
      <MainTitle>Properties</MainTitle>
      <Grid>
        <div>
          <DropdownWrapper>
            <StyledLabel>Area interval</StyledLabel>
            <StyledSelect>
              <option 
                value="0-500" 
                onClick={() => setAreaInterval([0, 500])}
              >
                0-500
              </option>
              <option 
                value="501-1000" 
                onClick={() => setAreaInterval([501, 1000])}
              >
                501-1000
              </option>
              <option 
                value="1001-2000" 
                onClick={() => setAreaInterval([1001, 2000])}
              >
                1001-2000
              </option>
              <option 
                value="2001-5000" 
                onClick={() => setAreaInterval([2001, 5000])}
              >
                2001-5000
              </option>
            </StyledSelect>
          </DropdownWrapper>

          <PropertyList>
            <PropertyListItem name="test" />
            <PropertyListItem name="test" />
            {properties.map((p, i) => {
              p.premisesTypes.forEach(type => {

              }) 
            })}
          </PropertyList>
        </div>

        <div><h1>Hello</h1></div>

        <div><h1>Hello</h1></div>
      </Grid>
    </PropertiesContainer>
  );
}

const PropertyList = styled.div`

`

const StyledSelect = styled.select`
  padding: 10px;
`

const StyledLabel = styled.label`
  padding-bottom: 5px;
`

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  
  gap: 20px;
`

const MainTitle = styled.h3`
  font-size: 24px;
  color: white;
  text-align: center;
  font-weight: bold;
  padding-bottom: 45px;
`

const PropertiesContainer = styled.div`
  width: 50%;
  background-color: #242b33;
  padding: 45px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  color: white;
`