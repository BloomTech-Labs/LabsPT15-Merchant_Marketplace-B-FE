import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/common/Layout/Layout';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { StyledButton } from '../../styles/styled-components';
import { useProfile } from '../../contexts/profile/ProfileProvider';

export function StoresPage() {
  const [loading, setLoading] = useState(true);
  const { stores, loaded } = useProfile();
  const history = useHistory();

  useEffect(
    function routeToStore() {
      if (stores.length > 0) {
        history.push(`/stores/${stores[0].id}/inventory`);
      }

      if (loaded) setLoading(false);
    },
    [stores]
  );

  return (
    <Layout>
      {loading ? (
        <p>loading...</p>
      ) : (
        <StyledContainer>
          <h1>Ooops it looks like you have not created a store.</h1>
          <p>Click below to get started.</p>
          <Link to="/new-store">
            <StyledButton>Create Store</StyledButton>
          </Link>
        </StyledContainer>
      )}
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
