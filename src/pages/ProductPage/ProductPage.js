import React, { useEffect, useState } from 'react';
import { NavBar } from '../../components/common/NavBar';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import './productPage.css';
import { useFetch } from '../../hooks/useFetch';
import { useOktaId } from '../../hooks/useOktaId';

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
    [oktaId]
  );

  const paramItemId = props.match.params.id;
  const item = inventory.find(item => {
    return item.id === Number(paramItemId);
  });
  return (
    <div>
      <NavBar />
      <ProductInfo item={item} />
    </div>
  );
};
