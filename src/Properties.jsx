import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropertyListItem from "./PropertyListItem";



export default function Properties({ properties }) {
  const [areaInterval, setAreaInterval] = useState([0, 500]);

  useEffect(() => {

  }, [areaInterval]);
  
  console.log("PROPERTIES", properties);
  console.log("AREAINTER", areaInterval);
  return (
    <PropertiesContainer>
      <MainTitle>Properties</MainTitle>
      <Grid>
        <div>
          <DropdownWrapper>
            <StyledLabel>Area interval</StyledLabel>
            <StyledSelect onChange={(e) => setAreaInterval(e.target.value.split(","))}>
              <option 
                value={[0, 500]} 
              >
                0-500
              </option>
              <option 
                value={[501, 1000]}
              >
                501-1000
              </option>
              <option 
                value={[1001, 2000]}
              >
                1001-2000
              </option>
              <option
                value={[2001, 5000]}
              >
                2001-5000
              </option>
            </StyledSelect>
          </DropdownWrapper>

          <PropertyList>
            {properties.map((p, i) => {
              return (p.premisesTypes.map(type => {
                // Make sure the premise type is within the area interval specified
                // If it is, then return the entire property
                if(type.area >= areaInterval[0] && type.area <= areaInterval[1]) {
                  return <PropertyListItem key={i} name={p.name} />
                } else return null;
              }));
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
  font-size: 16px;
`

const StyledLabel = styled.label`
  padding-bottom: 5px;
  font-size: 18px;
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