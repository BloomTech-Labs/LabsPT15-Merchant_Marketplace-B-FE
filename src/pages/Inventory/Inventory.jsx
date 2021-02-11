import React, { useEffect, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch';
import { Layout } from '../../components/common/Layout/Layout';
import { DataTable } from '../../components/common/DataTable';

import { useProfile } from '../../contexts/profile/ProfileProvider';

export function Inventory() {
  const { stores } = useProfile();
  const [inventory, setInventory] = useState([]);

  const { get, deleteReq } = useFetch();

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
  const handleList = id => {
    console.log(id);
  };
  const handleDelete = async id => {
    console.log(id);
    await deleteReq(`products/${id}`);
    const firstStoreData = await get(`stores/${stores[0].id}/products`);
    const newFirstStoreInventory = await firstStoreData.data;
    setInventory([...newFirstStoreInventory]);
  };

  return (
    <Layout>
      <div className="outerContainer">
        <div className="contents">
          <Link to="/myprofile/inventory/additem">
            <Button>+Add Item</Button>
          </Link>
          <DataTable
            title={'Inventory'}
            // columns array prop must be names of fields from correct table
            columns={['Name', 'Created_At', 'Price', 'Stock_Quantity']}
            inputData={inventory}
            actions={['Edit', 'List Item', 'Delete']}
            funcs={[handleEdit, handleList, handleDelete]}
          />
        </div>
      </div>
    </Layout>
  );
}
