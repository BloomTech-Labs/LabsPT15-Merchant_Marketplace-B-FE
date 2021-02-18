import React, { useEffect, useState } from 'react';
import { Rate, Avatar } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { StyledButton } from '../../styles/styled-components';

export const ProductInfo = ({ product }) => {
  return (
    <div className="product-page">
      <div className="product-container">
        <section className="product-column-1">
          <img
            src="https://media.istockphoto.com/photos/persian-rug-carpet-picture-id135093139"
            className="main-product-img"
            alt="product-placeholder"
          />
          <h4>Description</h4>
          <p>{product?.description}</p>
        </section>

        <section className="product-column-2">
          <div className="map-location">
            <img
              src="https://i.stack.imgur.com/O5kzo.jpg"
              className="map-sample"
              alt="map-placeholder"
            />
            <h6>San Fancisco, CA</h6>
          </div>
          <div className="store-container">
            <Avatar size="small" icon={<GlobalOutlined />} />
            <h5 id="store-name">{product?.store.name}</h5>
          </div>

          <h2 id="product-name">{product?.name}</h2>

          <div className="rating">
            <Rate />
          </div>

          <h3 id="product-price">${product?.price / 100}</h3>

          <div className="stock-quantity">
            {product?.stock_quantity > 0 ? (
              <p style={{ color: 'blue' }}>In Stock</p>
            ) : (
              <p style={{ color: 'red' }}>Out Of Stock</p>
            )}
            <label for="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product?.stock_quantity}
            />
          </div>
          <StyledButton id="add-to-cart">Add to Cart</StyledButton>
        </section>
      </div>
    </div>
  );
};
