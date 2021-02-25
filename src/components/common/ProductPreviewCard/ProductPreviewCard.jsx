import React from 'react';
import { Card, Typography, Image } from 'antd';
import { ImageFallback } from '../../icons/index';
import { useHistory } from 'react-router-dom';

export const ProductPreviewCard = ({ product, storeName }) => {
  const { Text } = Typography;
  const history = useHistory();
  const priceToDollars = price => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const viewProduct = id => {
    history.push(`/products/${id}`);
  };

  return (
    <Card
      hoverable
      style={{ borderRadius: '1rem' }}
      onClick={() => viewProduct(product.id)}
      cover={
        product.images.length > 0 ? (
          <Image alt={product.name} src={product.images[0]} />
        ) : (
          <ImageFallback height="150" fill={'#e8e8e8'} />
        )
      }
    >
      <p>
        <Text strong="true">{product.name}</Text>
        <br />
        {storeName ? storeName : null}
        {priceToDollars(product.price)}
      </p>
    </Card>
  );
};
