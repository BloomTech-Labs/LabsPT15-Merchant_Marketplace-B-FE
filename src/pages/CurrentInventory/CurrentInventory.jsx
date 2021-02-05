import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { SearchResults } from '../../components/inventory/SearchResults';
import useSearch from '../../hooks/useSearch';
import { useFetch } from '../../hooks/useFetch';
import { useOktaId } from '../../hooks/useOktaId';
import { Layout } from '../../components/common/Layout/Layout';

export function CurrentInventory() {
  const [searchData] = useState({});
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

  const displayedData = useSearch(inventory, 'name', searchData);

  return (
    <Layout>
      <div className="outerContainer">
        <div className="contents">
          <SearchResults data={displayedData} filter={searchData} />
          <Link to="/myprofile/inventory/additem">
            <Button>+Add Item</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
