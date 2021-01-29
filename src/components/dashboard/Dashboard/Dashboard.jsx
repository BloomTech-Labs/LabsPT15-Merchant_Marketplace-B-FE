import React from 'react';
import styled from 'styled-components';
import { InvSection } from '../InvSection';
import { OrderSection } from '../OrderSection';
import { CustomerSection } from '../CustomerSection';

export function Dashboard() {
  console.log('placeholder');
  return (
    <StyledDashboard className="dashboard">
      <div className="dashItem">
        <InvSection />
      </div>
      <div className="dashItem">
        <OrderSection />
      </div>
      <div className="dashItem">
        <CustomerSection />
      </div>
    </StyledDashboard>
  );
}

const StyledDashboard = styled.div`
  .dashboard {
    width: 80%;
    max-width: 1000px;
    height: 80%;
    margin: 10rem auto;
    display: flex;
    justify-content: space-between;
  }
  .dashItem {
    width: 32%;
    max-height: 60%;
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
  }
`;

// This comment is to commit the change to the folder name so they are uniform.
