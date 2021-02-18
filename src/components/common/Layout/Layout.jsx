import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../NavBar/NavBar';
import { SideNavBar } from '../SideNavBar/SideNavBar';

export function Layout({ children }) {
  return (
    <Container>
      <NavBar />
      <SideNavBar />
      <PageContent>{children}</PageContent>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1400px;
  height: 100vh;
  margin: 0 auto;
  padding: 32px 0;
  display: grid;
  grid-template-areas:
    'header header'
    'aside content';

  grid-template-columns: 300px auto;
  grid-template-rows: max-content auto;
  grid-gap: 32px;
  overflow: hidden;
`;

const PageContent = styled.main`
  grid-area: content;
  overflow-y: auto;
`;
