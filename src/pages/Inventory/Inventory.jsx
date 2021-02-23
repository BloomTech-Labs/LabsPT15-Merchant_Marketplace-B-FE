import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StyledButton } from '../../styles/styled-components';
import { Link } from 'react-router-dom';
import { CheckIcon, CancelIcon } from '../../components/icons/index';

import { useFetch } from '../../hooks/useFetch';
import { Layout } from '../../components/common/Layout/Layout';
import { DataTable } from '../../components/common/DataTable';

import { useProfile } from '../../contexts/profile/ProfileProvider';
import styled from 'styled-components';
import { format } from 'date-fns';
import { fromUnixTime } from 'date-fns/esm';

export function Inventory() {
  const { stores } = useProfile();
  const [inventory, setInventory] = useState([]);
  const { store_id } = useParams();
  const history = useHistory();

  const { get, put, deleteReq } = useFetch();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        const storeData = await get(`stores/${store_id}/products`);
        const storeInventory = await storeData.data;
        setInventory([...storeInventory]);
      }

      if (stores.length > 0) {
        asyncFetch();
      }
    },
    [stores, store_id, get]
  );

  const handleViewProduct = id => {
    history.push(`/products/${id}`);
  };

  const handleList = async id => {
    const publishItem = inventory.find(product => {
      return product.id === id;
    });
    publishItem.published = !publishItem.published;
    const res = await put(`products/${id}`, publishItem);
    if (res) {
      const storeData = await get(`stores/${store_id}/products`);
      const newStoreInventory = await storeData.data;
      setInventory([...newStoreInventory]);
    }
  };

  const handleDelete = async id => {
    await deleteReq(`products/${id}`);
    const storeData = await get(`stores/${store_id}/products`);
    const newStoreInventory = await storeData.data;
    setInventory([...newStoreInventory]);
  };

  const modifiedInventory = inventory.map(product => {
    const formatDate = format(fromUnixTime(product.created_at), 'LLL do, yyyy');
    const formatPrice = `$${(product.price / 100).toFixed(2)}`;
    const publishedIcon = product.published ? <CheckIcon /> : <CancelIcon />;
    return {
      ...product,
      created_at: formatDate,
      price: formatPrice,
      published: publishedIcon,
    };
  });

  return (
    <Layout>
      <StyledContainer>
        <DataTable
          title={'Inventory'}
          // columns array prop must be names of fields from correct table
          columns={[
            'Name',
            'Created_At',
            'Price',
            'Stock_Quantity',
            'Published',
          ]}
          inputData={modifiedInventory}
          actions={['View Product', 'List Item', 'Delete']}
          funcs={[handleViewProduct, handleList, handleDelete]}
        />
        <Link to={`/stores/${store_id}/add-product`}>
          <StyledButton>Add Product</StyledButton>
        </Link>
      </StyledContainer>
    </Layout>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr max-content;
  height: 100%;
  padding: 16px;
  background: white;
  border-radius: 12px;

  button {
    margin-left: auto;
  }
`;
