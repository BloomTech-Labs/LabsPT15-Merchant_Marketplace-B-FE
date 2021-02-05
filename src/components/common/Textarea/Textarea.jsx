import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const Textarea = forwardRef(({ label = null, ...props }, ref) => {
  return (
    <StyledContainer>
      {label ? <StyledLabel htmlFor={props.name}>{label}</StyledLabel> : null}
      <StyledTextarea {...props} ref={ref} />
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;
const StyledLabel = styled.label``;
const StyledTextarea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 14px 12px;
  border-radius: 12px;
  border: none;
  outline: none;
  background-color: white;
  resize: none;

  font-size: 14px;
  line-height: 21px;
  color: #707279;

  &::placeholder {
    color: #90939c;
  }
`;
