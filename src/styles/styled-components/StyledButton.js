import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 12px 24px;

  background: #c8c9ce;
  color: black;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 400;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 200ms ease-in-out;

  &:hover {
    background: #adaeb3;
  }
`;
