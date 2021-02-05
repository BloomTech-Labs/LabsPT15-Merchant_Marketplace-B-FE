import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export const Input = forwardRef(
  ({ label = null, icon: Icon, ...props }, ref) => {
    const isCheckbox = props.type === 'checkbox';

    return (
      <StyledContainer isCheckbox={isCheckbox}>
        {label ? (
          <StyledLabel htmlFor={props.name} isCheckbox={isCheckbox}>
            {label}
          </StyledLabel>
        ) : null}
        <StyledInputContainer isCheckbox={isCheckbox}>
          {Icon ? <Icon /> : null}
          <StyledInput
            {...props}
            Icon={Icon}
            isCheckbox={isCheckbox}
            ref={ref}
          />
        </StyledInputContainer>
      </StyledContainer>
    );
  }
);

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  ${({ isCheckbox }) =>
    isCheckbox &&
    css`
      width: fit-content;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    `}
`;
const StyledLabel = styled.label`
  ${({ isCheckbox }) =>
    isCheckbox &&
    css`
      margin-left: 8px;
    `}
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 14px 12px;
  border-radius: 12px;
  border: none;
  outline: none;
  background-color: white;

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

  ${({ isCheckbox }) =>
    isCheckbox &&
    css`
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;
