import React from 'react';
import styled from 'styled-components';

export function OrderCard({ orderNumber, name, status, price, itemCount }) {
  return (
    <StyledOrderCard>
      <div className="orderCardContainer">
        <h1>{orderNumber}</h1>
        <div className="orderInfo">
          <p>{name}</p>
          <h4>{status}</h4>
        </div>
        <div className="orderInfo">
          <h4>${price}</h4>
          <p>{itemCount} items</p>
        </div>
        <div className="indicator"></div>
      </div>
    </StyledOrderCard>
  );
}

const StyledOrderCard = styled.div`
  .orderCardContainer {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    background-color: lightgray;
    align-items: center;
    padding: 5px;
    height: 60px;
  }

  .orderInfo {
  }

  h4 {
    margin-bottom: 2px;
  }

  p {
    margin-bottom: 2px;
  }

  .activeLink {
    text-align: right;
    color: blue;
    font-weight: 700;
  }

  .indicator {
    width: 10px;
    height: 60px;
    height: 100%;
    background-color: orange;
  }
`;
