import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../../hooks/useFetch';
import './itemCardStyles.css';

function ItemCard({ name, description, price, imageId, count }) {
  const [img, setImg] = useState('');
  let dollars = price / 100;

  const { get } = useFetch();

  useEffect(
    function fetchImg() {
      async function asyncFetch() {
        const res = await get(`photo/${imageId}`);
        setImg(res.data[0]['url']);
      }

      asyncFetch();
    },
    [imageId]
  );

  return (
    <div className="cardContainer">
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
    </div>
  );
}

export default ItemCard;
