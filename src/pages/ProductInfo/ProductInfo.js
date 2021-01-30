import React, { useEffect, useState } from 'react';
import { Rate, Avatar, Tag } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useFetch } from '../../hooks/useFetch';

export const ProductInfo = ({ item }) => {
  const [img, setImg] = useState('');
  const { get } = useFetch();

  useEffect(
    function fetchImg() {
      async function asyncFetch() {
        const res = await get(`photo/${item?.id}`);
        setImg(res.data[0]['url']);
      }

      asyncFetch();
    },
    [item?.id]
  );

  let dollars = item?.price_in_cents / 100;
  return (
    <div className="product-page">
      <div className="product-container">
        <div>
          <img src={img} />
        </div>

        <div className="item">
          <div className="name-price">
            <p>{item?.item_name}</p>
            <p>${dollars}</p>
          </div>
          <div className="rating">
            <Rate />
          </div>
          <div className="store-name">
            <Avatar size="small" icon={<GlobalOutlined />} />
            <h3>Store Name</h3>
          </div>
          <p>location</p>
          <section>
            <p>{item?.description}</p>
            {item?.quantity_available !== 0 ? (
              <h2 style={{ color: 'green' }}>
                QTY: {item?.quantity_available}
              </h2>
            ) : (
              <h2 style={{ color: 'red' }}>QTY: {item?.quantity_available}</h2>
            )}
          </section>
        </div>
      </div>
      <section className="tags-container">
        <Tag className="tags">Tag</Tag>
        <Tag className="tags">Tag</Tag>
        <Tag className="tags">Tag</Tag>
        <Tag className="tags">Tag</Tag>
      </section>
    </div>
  );
};
