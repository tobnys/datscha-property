import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropertyListItem from "./PropertyListItem";

export default function Properties({ properties }) {
  const [areaInterval, setAreaInterval] = useState([0, 500]);
  const [premiseType, setPremiseType] = useState("");
  const [premiseTypesInArea, setPremiseTypesInArea] = useState([]);
  const [property, setProperty] = useState({});

  useEffect(() => {
    let premisesTypes = [];

    // Calculate premises types
    properties.map((p, i) => {
      return (p.premisesTypes.map(t => {

        // Make sure the premise type is within the area interval specified
        if(t.area >= areaInterval[0] && t.area <= areaInterval[1]) {

          // Add available premise type to array if it doesn't already exist
          if(!premisesTypes.includes(t.type)) {
            premisesTypes.push(t.type);
          }
        } else return null;
      }));
    })

    // Set default premise type
    if(premisesTypes.length > 1) {
      setPremiseTypesInArea(premisesTypes);
      setPremiseType(premisesTypes[0]);
    }

    // Set default property
    properties.map((p, i) => {
      return (p.premisesTypes.map(t => {
        if(t.area >= areaInterval[0] && t.area <= areaInterval[1] && premiseType === t.type) {
          setProperty(p);
        } else return null;
      }));
    })
  }, [properties, areaInterval, premiseType]);
  
  console.log("PROPERTYE", property);
  return (
    <PropertiesContainer>
      <MainTitle>Properties</MainTitle>
      <Grid>
        <div>
          <DropdownWrapper>
            <StyledLabel>Area interval</StyledLabel>
            <StyledSelect value={areaInterval} onChange={(e) => setAreaInterval(e.target.value.split(","))}>
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
        </div>

        <div>
          <DropdownWrapper>
            <StyledLabel>Premises types</StyledLabel>
            <StyledSelect value={premiseType} onChange={(e) => setPremiseType(e.target.value)}>
              {premiseTypesInArea.map((premiseType, i) => {
                return (
                  <option 
                    key={i}
                    value={premiseType} 
                  >
                    {premiseType}
                  </option>
                );
              })}
            </StyledSelect>
          </DropdownWrapper>
        </div>

        <div>
          <DropdownWrapper>
            <StyledLabel>Available properties</StyledLabel>
            <StyledSelect value={property} onChange={(e) => setProperty(e.target.value)}>
              {properties.map((p, i) => {
                return (p.premisesTypes.map(t => {
                  if(t.area >= areaInterval[0] && t.area <= areaInterval[1] && premiseType === t.type) {
                    return (
                      <option 
                        key={i}
                        value={p} 
                      >
                        {p.name}
                      </option>
                    );
                  } else return null;
                }));
              })}
            </StyledSelect>
          </DropdownWrapper>
        </div>
      </Grid>
      <PropertyContainer>
        <h1>{property.name}</h1>
      </PropertyContainer>
    </PropertiesContainer>
  );
}

const PropertyContainer = styled.div`
  display: flex;
  justify-content: center;
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