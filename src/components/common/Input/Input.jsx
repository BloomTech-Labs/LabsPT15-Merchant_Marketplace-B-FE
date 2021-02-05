import React from 'react';
import styled, { css } from 'styled-components';

export function Input({ label = null, icon: Icon, ...props }) {
  return (
    <StyledContainer>
      {label ? <StyledLabel htmlFor={props.name}>{label}</StyledLabel> : null}
      <StyledInputContainer>
        {Icon ? <Icon /> : null}
        <StyledInput {...props} Icon={Icon} />
      </StyledInputContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
`;
const StyledLabel = styled.label``;
const StyledInput = styled.input`
  width: 100%;
  padding: 14px 12px;
  border-radius: 12px;
  border: none;
  outline: none;
  background-color: #e8e8e8;

  font-size: 14px;
  line-height: 21px;
  color: #707279;

  &::placeholder {
    color: #90939c;
  }

  ${({ Icon }) =>
    Icon &&
    css`
      padding-left: 40px;
    `}
`;
const StyledInputContainer = styled.div`
  width: 100%;
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
`;
