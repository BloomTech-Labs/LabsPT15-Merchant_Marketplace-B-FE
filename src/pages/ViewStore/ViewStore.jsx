import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Layout } from '../../components/common/Layout/Layout';
import { ProductPreviewCard } from '../../components/common/ProductPreviewCard';

import { useProfile } from '../../contexts/profile/ProfileProvider';

export const ViewStore = () => {
  const { stores, profile } = useProfile();
  const { get } = useFetch();
  const [featured, setFeatured] = useState();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        // console.log(`stores`, stores);
        const firstStoreData = await get(`stores/${stores[0].id}/products`);
        const firstStoreInventory = await firstStoreData.data;
        setFeatured(firstStoreInventory.slice(0, 3));
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

  return <Layout>{featuredProducts}</Layout>;
};
