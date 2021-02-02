import React, { useEffect, useState } from 'react';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import './productPage.css';
import { useFetch } from '../../hooks/useFetch';
import { useOktaId } from '../../hooks/useOktaId';
import { Layout } from '../../components/common/Layout/Layout';

export const ProductPage = props => {
  const [inventory, setInventory] = useState([]);

  const { oktaId } = useOktaId();
  const { get } = useFetch();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        const res = await get(`items/profile/${oktaId}`);
        setInventory(res.data);
      }

      if (oktaId) {
        asyncFetch();
      }
    },
    [oktaId, get]
  );

  const paramItemId = props.match.params.id;
  const item = inventory.find(item => {
    return item.id === Number(paramItemId);
  });
  return (
    <Layout>
      <ProductInfo item={item} />
    </Layout>
  );
};
