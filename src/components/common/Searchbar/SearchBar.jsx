import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function SearchBar({ searchVisible, setData }) {
  const [inView, setInView] = useState('nope');
  const { Search } = Input;
  const { Option } = Select;

  function onSearch(values) {
    setData(values);
  }

  function sortChange(value) {
    console.log(`selected sortBy: ${value}`);
  }

  function categoryChange(value) {
    console.log(`selected category: ${value}`);
  }

  useEffect(() => {
    if (searchVisible === false) {
      setInView('inView');
    }
  });

  return (
    <StyledSearchBar className={inView}>
      <div className="searchOuter">
        <div className="searchBtns"></div>
        <Search
          defaultValue="Search through your inventory"
          className="searchBar"
          onSearch={onSearch}
        />
        <div>
          <Select defaultValue="Sort By" onChange={sortChange}>
            <Option value="cat">Category</Option>
          </Select>
          <Select defaultValue="Category" onChange={categoryChange}>
            <Option value="candy">Candy</Option>
          </Select>
        </div>
        <div>
          <Link to="/myprofile/inventory/additem">
            <Button className="add-item-button">+ Add Item</Button>
          </Link>
        </div>
      </div>
      <div className="searchBtns">
        <Button>Main</Button>
        <Button>Drafts</Button>
        <Button>Archives</Button>
      </div>
    </StyledSearchBar>
  );
}

const StyledSearchBar = styled.div`
  .nope {
    display: none;
  }

  .searchOuter {
    background-color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    padding-bottom: 10px;
  }
  .searchBar {
    padding: 0 5px 0 50px;
    max-width: 300px;
  }

  .add-item-button {
    margin-right: 20px;
    background-color: rgb(19, 75, 29);
    color: white;
  }
  .searchBtns {
    display: flex;
    background-color: white;
  }

  .searchBtns button {
    background-color: rebeccapurple;
    color: white;
  }
`;
