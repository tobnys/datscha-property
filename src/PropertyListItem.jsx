import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function PropertyListItem({ name, value }) {

  return (
    <PropertyListItemContainer>
      <ItemName>{name}</ItemName>
    </PropertyListItemContainer>
  );
}

const PropertyListItemContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.404);
  border-radius: 5px;
  padding: 20px;
`

const ItemName = styled.h3`
  margin: 0;
`