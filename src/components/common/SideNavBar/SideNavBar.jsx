import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { StoresMenuList } from '../StoresMenuList/StoresMenuList';
import { StyledButton } from '../../../styles/styled-components';

export function SideNavBar() {
  const history = useHistory();

  function onCreateStore() {
    history.push('/new-store');
  }

  return (
    <StyledAside>
      <StyledNav>
        <h4>Stores</h4>
        <StoresMenuList />
      </StyledNav>
      <StyledButton onClick={onCreateStore}>Create Store</StyledButton>
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  grid-area: aside;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  background: white;
  padding: 16px;
`;
const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
`;
