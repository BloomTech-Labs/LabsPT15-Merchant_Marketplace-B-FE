import { useOktaAuth } from '@okta/okta-react';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledButton } from '../../../styles/styled-components';
import { SearchIcon } from '../../icons';
import { Input } from '../Input';

export function NavBar() {
  const {
    authState: { isAuthenticated },
    authService,
  } = useOktaAuth();

  const login = useCallback(() => authService.login('/'), [authService]);

  const logout = useCallback(() => authService.logout('/'), [authService]);

  return (
    <StyledHeader>
      <StyledFlex>
        <StyledLink to="/">mm.</StyledLink>
        <Input placeholder="Search..." name="search" icon={SearchIcon} />
      </StyledFlex>
      {isAuthenticated ? (
        <StyledButton onClick={logout}>Logout</StyledButton>
      ) : (
        <StyledButton onClick={login}>Login</StyledButton>
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  grid-area: header;
  display: grid;
  grid-template-columns: max-content auto;
  grid-gap: 24px;
  align-items: center;
  justify-content: space-between;
`;

const StyledFlex = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: max-content 500px;
`;

const StyledLink = styled(Link)`
  width: 92px;
  height: 48px;
  background: #3d5af1;
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: white;

  &:hover {
    color: white;
  }
`;
