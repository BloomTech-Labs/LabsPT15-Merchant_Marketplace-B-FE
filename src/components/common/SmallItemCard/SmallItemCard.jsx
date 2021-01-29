import React from 'react';
import styled from 'styled-components';

export function SmallItemCard({ headerText, descText }) {
  return (
    <div className="smallCardContainer">
      <h3>{headerText}</h3>
      <p>{descText}</p>
    </div>
  );
}

const StyledSmallItemCard = styled.div`
  .smallCardContainer {
    margin: 2px 5px 5px 3px;
    padding: 3px 5px;
    height: 60px;
    border: 1px solid black;
    border-radius: 2px;
  }
  h3 {
    margin-bottom: 2px;
  }
`;
