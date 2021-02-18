import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Layout } from '../../components/common/Layout/Layout';
import { ProductPreviewCard } from '../../components/common/ProductPreviewCard';

import { useProfile } from '../../contexts/profile/ProfileProvider';

export const ViewStore = () => {
  const { stores, profile } = useProfile();
  const { get } = useFetch();
  const { store_id } = useParams();
  const [featured, setFeatured] = useState();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        const storeData = await get(`stores/${store_id}/products`);
        const storeInventory = await storeData.data;
        setFeatured(storeInventory.slice(0, 3));
      }

      if (stores.length > 0) {
        asyncFetch();
      }
    },
    [stores, profile, get]
  );

  const featuredProducts = featured?.map(product => {
    return <ProductPreviewCard key={product.id} product={product} />;
  });

  return (
    <Layout>
      <StyledFeatured>{featuredProducts}</StyledFeatured>
    </Layout>
  );
};

const StyledFeatured = styled.div`
  & {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    width: 50%;
  }
`;
