import React, { useState, useEffect, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge } from 'antd';
import { Button } from '..';
import styled from 'styled-components';
import { useOktaAuth } from '@okta/okta-react';

export function MainNavBar() {
  const { authState, authService } = useOktaAuth();
  console.log('placeholder');
  return (
    <StyledMainNavBar className="nav-bar">
      {/* logo */}
      <div className="logo">
        <span>MERCHANT</span> MARKETPLACE
      </div>
      <div className="menu">
        {authState.isAuthenticated && (
          <NavLink
            className="link"
            activeStyle={{ color: 'white' }}
            to="/myprofile"
          >
            My Profile
          </NavLink>
        )}
        {authState.isAuthenticated && (
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        )}
        {!authState.isAuthenticated && (
          <Button handleClick={() => authService.login()} buttonText="Login" />
        )}
      </div>
    </StyledMainNavBar>
  );
}

const StyledMainNavBar = styled.nav`
  .nav-bar {
    display: flex;
    justify-content: space-between;
    background-color: rebeccapurple;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 4;
  }

  .logo {
    width: 140px;
    height: 50px;
    background-color: white;
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
    margin-left: 10%;
    padding-left: 40px;
    font-weight: 400;
    color: black;
    font-size: smaller;
  }
`;

// This comment is to commit the change to the folder name so they are uniform.
