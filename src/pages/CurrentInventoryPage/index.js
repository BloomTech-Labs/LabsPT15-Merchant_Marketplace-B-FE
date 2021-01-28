import { useOktaAuth } from '@okta/okta-react/src/OktaContext';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { fetchProducts } from '../../state/actions';
import { Link } from 'react-router-dom';

import { NavBar } from '../../components/common/NavBar';
import SearchResults from '../../components/inventory/SearchResults/searchResults';
import useSearch from '../../hooks/useSearch';

function CurrentInventory({ inventory, fetchProducts, getProductsStatus }) {
  const [searchData, setSearchData] = useState({});
  const { authState } = useOktaAuth();

  useEffect(() => {
    fetchProducts(authState);
  }, []);

  const displayedData = useSearch(inventory, 'name', searchData);
  console.log(inventory);
  return (
    <>
      <NavBar searchVisible={false} setData={setSearchData} />
      <div className="outerContainer">
        <div className="contents">
          <SearchResults data={displayedData} filter={searchData} />
          <Link to="/myprofile/inventory/additem">
            <Button>+Add Item</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = state => ({
  inventory: state.products.products,
  getProductsStatus: state.products.getProductsStatus,
});

export default connect(mapStateToProps, { fetchProducts })(CurrentInventory);
