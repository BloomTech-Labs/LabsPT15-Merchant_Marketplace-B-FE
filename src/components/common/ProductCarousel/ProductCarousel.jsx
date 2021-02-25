import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel } from 'antd';
import { useRef } from 'react';
import { LeftCircleArrow, RightCircleArrow } from '../../icons';

export function ProductCarousel({ images }) {
  const carouselRef = useRef();
  const next = () => carouselRef.current.next();
  const prev = () => carouselRef.current.prev();

  return (
    <StyledCarouselContainer>
      <StyledLeftArrowContainer onClick={prev}>
        <LeftCircleArrow />
      </StyledLeftArrowContainer>
      <StyledCarousel ref={carouselRef}>
        {images?.map((imageURL, index) => (
          <StyledProductImage
            className="content-style"
            imageURL={imageURL}
            key={index}
          ></StyledProductImage>
        ))}
      </StyledCarousel>
      <StyledRightArrowContainer onClick={next}>
        <RightCircleArrow />
      </StyledRightArrowContainer>
    </StyledCarouselContainer>
  );
}

const StyledCarousel = styled(Carousel)`
  .content-style {
    color: #fff;
    lineheight: 160px;
    textalign: center;
  }
`;

const StyledCarouselContainer = styled.div`
  position: relative;
`;

const StyledLeftArrowContainer = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
`;

const StyledRightArrowContainer = styled(StyledLeftArrowContainer)`
  left: unset;
  right: 8px;
`;

const StyledProductImage = styled.div`
  ${({ imageURL }) =>
    imageURL &&
    css`
      background-image: url(${imageURL});
      background-position: center;
      background-size: cover;
      border-radius: 16px;
      width: 400px;
      height: 350px;
    `}
`;
