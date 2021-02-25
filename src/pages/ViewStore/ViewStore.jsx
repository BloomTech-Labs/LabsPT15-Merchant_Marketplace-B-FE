import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Rate } from 'antd';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Layout } from '../../components/common/Layout/Layout';
import { ProductPreviewCard } from '../../components/common/ProductPreviewCard';
import { useProfile } from '../../contexts/profile/ProfileProvider';
import { ImageFallback } from '../../components/icons/index';

export const ViewStore = () => {
  const { stores, profile } = useProfile();
  const { get } = useFetch();
  const { store_id } = useParams();
  const [featured, setFeatured] = useState();
  const [storeData, setStoreData] = useState({});
  const { Meta } = Card;

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        const storeData = await get(`stores/${store_id}/products`);
        const storeInventory = await storeData.data;
        setFeatured(storeInventory.slice(0, 3));
        const thisStore = await get(`stores/${store_id}`);
        const thisStoreData = await thisStore.data;
        setStoreData(thisStoreData);
      }

      if (profile) {
        asyncFetch();
      }
    },
    [profile, get, store_id]
  );

  const featuredProducts = featured?.map(product => {
    return <ProductPreviewCard key={product.id} product={product} />;
  });

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Card
          style={{ width: '60%', marginBottom: '2rem', borderRadius: '1rem' }}
          cover={
            stores.images?.length > 0 ? (
              <img alt="example" src={stores.images[0]} />
            ) : (
              <ImageFallback height="300" fill={'#e8e8e8'} />
            )
          }
        >
          <Meta title="Description" description={storeData.description} />
        </Card>
        <Card
          style={{
            width: '35%',
            marginBottom: '2rem',
            borderRadius: '1rem',
          }}
          cover={
            <img
              src="https://i.stack.imgur.com/O5kzo.jpg"
              className="map-sample"
              alt="map-placeholder"
            />
          }
        >
          <div style={{ fontSize: '1.25rem' }}>{storeData.name}</div>
          <div className="rating">
            <Rate />
          </div>
        </Card>
      </div>
      <StyledFeatured>{featuredProducts}</StyledFeatured>
    </Layout>
  );
};

const StyledFeatured = styled.div`
  & {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;
