import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react';
import { getDSData } from '../../../services/api';
import styled from 'styled-components';

export function ItemCard({ name, description, price, image, count }) {
  const [img, setImg] = useState('');
  const { authState } = useOktaAuth();
  let dollars = price / 100;
  const imgGet = id => {
    getDSData(`${process.env.REACT_APP_API_URI}photo/${id}`, authState)
      .then(res => setImg(res[0]['url']))
      .catch(err => {
        console.log('Img get fail.');
      });
  };
  useEffect(() => {
    imgGet(image);
  }, []);

  return (
    <StyledItemCard className="cardContainer">
      <img src={img} className="cardImage" />
      <div className="cardDesc">
        <h2 className="descText">{name}</h2>
        <p className="descText" activeStyle={{ color: 'black' }}>
          {description}
        </p>
      </div>
      <div>
        <h2 className="cardPrice">${dollars}</h2>
        {count !== 0 ? (
          <h2 style={{ color: 'green' }}>QTY: {count}</h2>
        ) : (
          <h2 style={{ color: 'red' }}>QTY: {count}</h2>
        )}
      </div>
    </StyledItemCard>
  );
}

const StyledItemCard = styled.div`
  .cardContainer {
    height: 130px;
    border-bottom: solid lightgray 1px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin: 10px 0 10px 0;
  }
  .cardImage {
    width: 150px;
    height: 120px;
    border-radius: 6px;
    object-fit: contain;
  }
  .cardDesc {
    width: 60%;
    max-width: 120px;
    overflow-y: hidden;
    max-width: 400px;
    font-size: 0.75rem;
  }
  .descText {
    margin-bottom: 0.125rem;
    color: black;
    text-decoration: none;
  }
  .cardPrice {
    margin-top: 10%;
  }
`;
