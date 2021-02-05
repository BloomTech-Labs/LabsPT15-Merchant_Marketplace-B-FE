import React from 'react';
import { Layout } from '../../components/common/Layout/Layout';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledButton } from '../../styles/styled-components';

export function LandingPage() {
  return (
    <Layout>
      <StyledContainer>
        <h1>Ooops it looks like you have not created a store.</h1>
        <p>Click below to get started.</p>
        <Link to="/new-store">
          <StyledButton>Create Store</StyledButton>
        </Link>
      </StyledContainer>
    </Layout>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;

  h1,
  p {
    margin: 0;
  }

  p {
    margin-bottom: 8px;
    margin-top: 16px;
  }

  button {
    width: 188px;
  }
`;
