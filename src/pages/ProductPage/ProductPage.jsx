import React, { useEffect, useState } from 'react';
import { ProductInfo } from '../ProductInfo/ProductInfo';

import styled from 'styled-components';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../contexts/profile/ProfileProvider';
import { Layout } from '../../components/common/Layout/Layout';

export const ProductPage = props => {
  const [inventory, setInventory] = useState();

  const { profile } = useProfile();
  const { product_id } = useParams();
  const { get } = useFetch();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        try {
          const res = await get(`products/${product_id}`);
          console.log(res.data);
          setInventory(res.data[0]);
        } catch (e) {
          console.error(e);
        }
      }

      if (profile) {
        asyncFetch();
      }
    },
    [profile, get]
  );

  return (
    <Layout>
      <StyledProductPage>
        <ProductInfo inventory={inventory} />
      </StyledProductPage>
    </Layout>
  );
};

const StyledProductPage = styled.div`
  .product-container {
    display: flex;
  }

  .product-column-1 {
    width: 55%;
    margin-right: 5%;
  }

  .product-column-2 {
    width: 35%;
    margin-right: 5%;
  }

  /* .carousel-container {
    height: 300px;
    background-color: lightpink;
    width: 50%;
  } */

  .main-product-img {
    width: 100%;
    heigh: auto;
    margin-bottom: 5%;
  }

  .map-sample {
    width: 100%;
    height: auto;
    border-radius: 5%;
  }

  .name-price {
    font-size: xx-large;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .store-name {
    display: flex;
    margin-top: 2%;
  }

  #add-to-cart {
    width: 100%;
    background-color: #000024;
    color: white;
  }
`;
