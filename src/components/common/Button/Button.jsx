import React from 'react';
import styled from 'styled-components';

export function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  padding: 12px 24px;

  background: #c8c9ce;
  color: black;
  border-radius: 12px;
  border: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 200ms ease-in-out;

  &:hover {
    background: #adaeb3;
  }
`;
