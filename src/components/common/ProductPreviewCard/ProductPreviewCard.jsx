import React from 'react';
import { Card } from 'antd';

export const ProductPreviewCard = ({ product }) => {
  const { Meta } = Card;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.name} src={product.images[0]} />}
    >
      <Meta title={product.name} description={product.description} />
    </Card>
  );
};
