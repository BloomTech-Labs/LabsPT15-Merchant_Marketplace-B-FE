import React from 'react';
import styled, { css } from 'styled-components';
import { ImageIcon } from '../../icons';

export function ImageFormGallery({ images }) {
  while (images.length < 5) {
    images.push('');
  }

  return (
    <StyledContainer>
      <StyledPrimaryImage source={images[0]}>
        {!images[0] ? <ImageIcon /> : null}
      </StyledPrimaryImage>
      {images.map((imageUrl, index) => {
        if (index === 0) return null;

        return (
          <StyledSecondaryImage source={imageUrl} key={imageUrl + index}>
            {!imageUrl ? <ImageIcon /> : null}
          </StyledSecondaryImage>
        );
      })}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'primary . .'
    'primary . .';
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;
`;
const StyledPrimaryImage = styled.div`
  grid-area: primary;
  background-color: #e8e8e8;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 68px;
    height: auto;
  }

  ${({ source }) =>
    source &&
    css`
      background-image: url(${source});
      background-size: cover;
      background-position: center;
    `}
`;
const StyledSecondaryImage = styled(StyledPrimaryImage)`
  grid-area: unset;
`;
