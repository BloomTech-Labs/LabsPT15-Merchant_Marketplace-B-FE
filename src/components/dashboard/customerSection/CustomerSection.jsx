import React from 'react';
import { SmallItemCard } from '../../common/SmallItemCard';
import { WechatOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export function CustomerSection() {
  return (
    <StyledCustomerSection>
      <div className="customerHeader">
        <h2>Customers</h2>
        <div>
          <WechatOutlined />
          <PlusOutlined />
        </div>
      </div>

      <p>Information</p>
      <SmallItemCard headerText={36} descText="Customers" />
    </StyledCustomerSection>
  );
}

const StyledCustomerSection = styled.div`
  .customerHeader {
    display: flex;
    justify-content: space-between;
  }
`;

// This comment is to commit the change to the folder name so they are uniform.
