import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export function SideNavBar() {
  return (
    <StyledAside>
      <StyledNav>
        <Link to="/">/</Link>
        <Link to="/myprofile">/mp</Link>
        <Link to="/myprofile/inventory">/mp/inventory</Link>
        <Link to="/myprofile/inventory/additem">/mp/inventory/additem</Link>
        <Link to="/myprofile/inventory/productpage/1">
          /mp/inventory/productpage/1
        </Link>
      </StyledNav>
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  grid-area: aside;
  border-radius: 16px;
  background: #e8e8e8;
  padding: 16px;
`;
const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
`;
