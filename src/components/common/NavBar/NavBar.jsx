import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';

export function NavBar({ searchVisible, data, setData }) {
  return (
    <StyledNavBar className="nav-container">
      <div className="nav">
        <div className="logo">
          <NavLink to="/" activeStyle={{ color: 'black' }}>
            <span style={{ color: 'rebeccapurple' }}>MERCHANT</span> MARKETPLACE
          </NavLink>
        </div>
        <Link to="/myprofile/inventory">Inventory</Link>
        <Link>Orders</Link>
        <Link>Payment</Link>
        <Link>Messages</Link>
      </div>
      <SearchBar searchVisible={searchVisible} setData={setData} data={data} />
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  .nav-container {
    background-color: rebeccapurple;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 4;
    align-items: center;
  }
  .nav {
    display: flex;
    align-items: center;
    width: 100%;
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

  .logo > span {
    color: rebeccapurple;
  }
  .nav > a {
    color: white;
    margin-left: 15px;
  }
  .nav > a:hover {
    font-weight: bold;
    color: white;
  }

  .nav > a:last-child {
    margin-left: auto;
    padding-right: 10%;
  }
`;
