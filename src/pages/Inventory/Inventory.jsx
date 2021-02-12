import React, { useEffect, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { CheckIcon, CancelIcon } from '../../components/icons/index';

import { useFetch } from '../../hooks/useFetch';
import { Layout } from '../../components/common/Layout/Layout';
import { DataTable } from '../../components/common/DataTable';

import { useProfile } from '../../contexts/profile/ProfileProvider';

export function Inventory() {
  const { stores } = useProfile();
  const [inventory, setInventory] = useState([]);

  const { get, put, deleteReq } = useFetch();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        const firstStoreData = await get(`stores/${stores[0].id}/products`);
        const firstStoreInventory = await firstStoreData.data;
        setInventory([...firstStoreInventory]);
      }

      if (stores.length > 0) {
        asyncFetch();
      }
    },
    [stores, get]
  );

  const handleEdit = id => {
    // go to edit product page and use this products info
    console.log(id);
  };
  const handleList = async id => {
    const publishItem = inventory.find(product => {
      return product.id === id;
    });
    publishItem.published = !publishItem.published;
    const res = await put(`products/${id}`, publishItem);
    if (res) {
      const firstStoreData = await get(`stores/${stores[0].id}/products`);
      const newFirstStoreInventory = await firstStoreData.data;
      setInventory([...newFirstStoreInventory]);
    }
  };
  const handleDelete = async id => {
    await deleteReq(`products/${id}`);
    const firstStoreData = await get(`stores/${stores[0].id}/products`);
    const newFirstStoreInventory = await firstStoreData.data;
    setInventory([...newFirstStoreInventory]);
  };

  const modifiedInventory = inventory.map(product => {
    const formatDate = new Date(product.created_at).toDateString();
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
      <Link to="/myprofile/inventory/additem">
        <Button>+Add Item</Button>
      </Link>
      <DataTable
        title={'Inventory'}
        // columns array prop must be names of fields from correct table
        columns={['Name', 'Created_At', 'Price', 'Stock_Quantity', 'Published']}
        inputData={modifiedInventory}
        actions={['Edit', 'List Item', 'Delete']}
        funcs={[handleEdit, handleList, handleDelete]}
      />
    </Layout>
  );
}
