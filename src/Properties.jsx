import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Properties({ properties }) {
  const [areaInterval, setAreaInterval] = useState([0, 500]);
  const [premiseType, setPremiseType] = useState("");
  const [premiseTypesInArea, setPremiseTypesInArea] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [property, setProperty] = useState(null);
  const [propertyId, setPropertyId] = useState(null);

  useEffect(() => {
    let premisesTypes = [];

    // Determine premises types
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
    }
    
    // Form a list for available properties
    let available = [];
    properties.forEach(p => {
      return (p.premisesTypes.forEach(t => {
        if(t.area >= areaInterval[0] && t.area <= areaInterval[1] && premiseType === t.type) {
          available.push(p);
        } else return null;
      }))
    });
    setAvailableProperties(available);

    if(!property && available.length > 0) {
      setProperty(available[0]);
    }

    // If its a new list, set the property to be the first in the list
    if(!available.some(a => a.name === (property && property.name))) {
      setProperty(available[0]);
    }
    
  }, [properties, areaInterval, premiseType, property]);

  useEffect(() => {
    // Add property by ID, only if propertyId has changed.
    if(propertyId) {
      setProperty(properties.find(p => p.id === propertyId));
    }
  }, [properties, propertyId])

  function calculateTotalYield() {
    let totalRentYield = 0;
    if(property && property.premisesTypes) {
      property.premisesTypes.forEach((premiseType) => {
        totalRentYield = totalRentYield+Math.round(premiseType.rent)*1.05;
      })
    } 
    return <RentYieldTitle>{Math.round(totalRentYield)}</RentYieldTitle>
  }

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
              {!premiseType && <option value={""}></option>}
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
            <StyledSelect value={property && property.id} onChange={(e) => setPropertyId(e.target.value)}>
              {!property && <option value={""}></option>}
              {availableProperties.map((p, i) => {
                return (
                  <option 
                    key={i}
                    value={p.id} 
                  >
                    {p.name}
                  </option>
                );
              })}
            </StyledSelect>
          </DropdownWrapper>
        </div>
      </Grid>
      <PropertyContainer>
        <MainTitle>Rent specification for {property && property.name}</MainTitle>
        <StyledTable>
          <tbody>
            <tr>
              <th scope="col">Premise Type</th>
              <th scope="col">Start rent</th>
              <th scope="col">Year 1</th>
              <th scope="col">Year 2</th>
              <th scope="col">Year 3</th>
              <th scope="col">Year 4</th>
              <th scope="col">Year 5</th>
            </tr>

            {property && property.premisesTypes && property.premisesTypes.map((premiseType, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{premiseType.type}</th>
                  <td>{Math.round(premiseType.rent)}</td>
                  <td>{Math.round(premiseType.rent*1.05)}</td>
                  <td>{Math.round((premiseType.rent*1.05)*1.05)}</td>
                  <td>{Math.round(((premiseType.rent*1.05)*1.05)*1.03)}</td>
                  <td>{Math.round((((premiseType.rent*1.05)*1.05)*1.03)*1.02)}</td>
                  <td>{Math.round(((((premiseType.rent*1.05)*1.05)*1.03)*1.02)*1.02)}</td>
                </tr>
              )
            })}
          </tbody>
        </StyledTable>
      </PropertyContainer>
      <PropertyContainer>
        <MainTitle>Total rent yield for next year</MainTitle>
        {calculateTotalYield()}
      </PropertyContainer>
    </PropertiesContainer>
  );
}

const RentYieldTitle = styled.h4`
  font-size: 24px;
  color: white;
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding-bottom: 40px;
`

const StyledTable = styled.table`
  text-align: left;
`

const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
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