import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

// import { SearchResults } from '../../components/inventory/SearchResults';
// import useSearch from '../../hooks/useSearch';
import { useFetch } from '../../hooks/useFetch';
import { useOktaId } from '../../hooks/useOktaId';
import { Layout } from '../../components/common/Layout/Layout';
import { DataTable } from '../../components/common/DataTable';

export function CurrentInventory() {
  // const [searchData] = useState({});
  const [inventory, setInventory] = useState([]);

  const { oktaId } = useOktaId();
  const { get } = useFetch();

  useEffect(
    function fetchInventory() {
      async function asyncFetch() {
        const allStores = await get(`profiles/${oktaId}/stores`);
        const firstStoreID = await allStores.data[0].id;
        const firstStoreData = await get(`stores/${firstStoreID}/products`);
        const firstStoreInventory = await firstStoreData.data;
        setInventory([...firstStoreInventory]);
        console.log(`set inventory, ${firstStoreInventory.length} items`);
      }

      if (oktaId) {
        asyncFetch();
      }
    },
    [oktaId, get]
  );

  // const displayedData = useSearch(inventory, 'name', searchData);

  return (
    <Layout>
      <div className="outerContainer">
        <div className="contents">
          {/* <SearchResults data={inventory} filter={searchData} /> */}
          <Link to="/myprofile/inventory/additem">
            <Button>+Add Item</Button>
          </Link>
          <DataTable
            title={'Inventory'}
            // columns array prop must be names of fields from correct table
            columns={['Name', 'Created_At', 'Price', 'Stock_Quantity']}
            inputData={inventory}
            actions={['Edit', 'List Item', 'Delete']}
          />
        </div>
      </div>
    </Layout>
  );
}
