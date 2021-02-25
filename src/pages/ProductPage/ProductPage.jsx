import React, { useEffect, useState } from 'react';
import { ProductInfo } from '../ProductInfo';
import styled from 'styled-components';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../contexts/profile/ProfileProvider';
import { Layout } from '../../components/common/Layout/Layout';

export const ProductPage = props => {
  const [product, setProduct] = useState();

  const { profile } = useProfile();
  const { product_id } = useParams();
  const { get } = useFetch();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        try {
          const productRes = await get(`products/${product_id}`);
          const storeRes = await get(`stores/${productRes.data[0].store_id}`);
          console.log({ productRes, storeRes });
          setProduct({
            ...productRes.data[0],
            store: {
              ...storeRes.data,
              location: JSON.parse(storeRes.data.location),
            },
          });
        } catch (e) {
          console.error(e);
        }
      }

      if (profile) {
        asyncFetch();
      }
    },
    [profile, get, product_id]
  );

  console.log({ product });

  return (
    <Layout>
      <StyledProductPage>
        <ProductInfo product={product} />
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
    height: auto;
    margin-bottom: 3.5%;
  }

  .map-sample {
    width: 100%;
    height: auto;
    border-radius: 16px;
    margin-bottom: 4px;
  }

  #location {
    margin: 0;
    font-size: 14px;
  }

  .store-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  #store-name {
    padding-left: 2%;
  }

  #product-name {
    margin: 0;
    padding: 0;
  }

  .rating {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;
  }

  #product-price {
    margin-top: 0;
    margin-bottom: 0;
  }

  .stock-quantity {
    margin-top: 0;
    margin-bottom: 4%;
    display: flex;
    flex-direction: column;
  }

  #quantity {
    border: none;
    border-radius: 10%;
    width: 16.5%;
    height: 4vh;
    padding-left: 1.5%;
  }

  #add-to-cart {
    width: 100%;
    background-color: #000024;
    color: white;
  }
`;
