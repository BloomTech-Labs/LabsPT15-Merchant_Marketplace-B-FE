import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';

export function ProductCarousel(a, b, c) {
  console.log(a, b, c);

  return (
    <Carousel autoplay>
      <StyledCarousel>
        <div>
          <h3 className="content-style">1</h3>
        </div>
        <div>
          <h3 className="content-style">2</h3>
        </div>
        <div>
          <h3 className="content-style">3</h3>
        </div>
        <div>
          <h3 className="content-style">4</h3>
        </div>
      </StyledCarousel>
    </Carousel>
    // mountNode,
  );
}

const StyledCarousel = styled.div`{
  
  .content-style{
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  }
}`;
