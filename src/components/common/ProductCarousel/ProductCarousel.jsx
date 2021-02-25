import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel } from 'antd';
import { useRef } from 'react';

const photos = [
  'https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg',
  'https://s.yimg.com/os/creatr-uploaded-images/2020-06/f1fdd6b0-a3ee-11ea-9def-6ffa1e08d1d5',
  'https://cdn.vox-cdn.com/thumbor/xOoaLg3F5qCLPaULyUaUgL8E1bs=/0x0:1038x498/1400x1050/filters:focal(436x166:602x332):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/51885631/Screen_Shot_2016_11_17_at_10.53.53_AM.0.png',
  'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg',
];

export function ProductCarousel({ images }) {
  const carouselRef = useRef();

  return (
    <StyledCarousel ref={carouselRef} autoplay>
      {images?.map((imageURL, index) => (
        <StyledProductImage
          className="content-style"
          imageURL={imageURL}
          key={index}
        ></StyledProductImage>
      ))}
    </StyledCarousel>
  );
}

const StyledCarousel = styled(Carousel)`
  .content-style {
    color: #fff;
    lineheight: 160px;
    textalign: center;
  }
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
