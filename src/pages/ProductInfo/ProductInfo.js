import React, { useEffect, useState } from 'react';
import { Rate, Avatar } from 'antd';
import { Button } from '../../components/common/Button';
import { GlobalOutlined } from '@ant-design/icons';

export const ProductInfo = ({ inventory }) => {
  return (
    <div className="product-page">
      <div className="product-container">
        <section className="product-column-1">
          <img
            src="https://media.istockphoto.com/photos/persian-rug-carpet-picture-id135093139"
            className="main-product-img"
          />
          <h4>Description</h4>
          <p>{inventory?.description}</p>
        </section>

        <section className="product-column-2">
          <div className="map-location">
            <img
              src="https://i.stack.imgur.com/O5kzo.jpg"
              className="map-sample"
            />
            <h6>San Fancisco, CA</h6>
          </div>
          <div className="store-name">
            <Avatar size="small" icon={<GlobalOutlined />} />
            <h5>Store Name</h5>
          </div>

          <h2>{inventory?.name}</h2>

          <div className="rating">
            <p>Rating: </p>
            <Rate />
          </div>
          <p>${inventory?.price / 100}</p>

          <div className="stock-quantity">
            {inventory?.stock_quantity > 0 ? (
              <p style={{ color: 'blue' }}>In Stock</p>
            ) : (
              <p style={{ color: 'red' }}>Out Of Stock</p>
            )}
            <p>Quantity: {inventory?.stock_quantity}</p>
          </div>
          <Button id="add-to-cart">Add to Cart</Button>
        </section>
      </div>
    </div>
  );
};
