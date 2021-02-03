import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { AimOutlined, SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export function BrowserBar() {
  const [search, setSearch] = useState({ location: '', item: '' });
  const searchHandle = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {};
  return (
    <StyledBrowserBar className="search-bar">
      <div className="location">
        {' '}
        <Input
          prefix={<AimOutlined />}
          name="location"
          value={search.location}
          placeholder="Enter zipcode city/town"
          onChange={searchHandle}
          onSubmit={submitHandler}
        />
      </div>

      <Input
        name="item"
        value={search.item}
        onChange={searchHandle}
        placeholder="What are you looking for?"
        onSubmit={submitHandler}
      />
      <Button htmlType="submit">
        <SearchOutlined />
      </Button>
    </StyledBrowserBar>
  );
}

const StyledBrowserBar = styled.form`
  .search-bar {
    width: 50%;
    display: flex;
  }

  .location {
    width: 30%;
  }

  @media only screen and (max-width: 600px) {
    .search-bar {
      width: 100%;
      display: flex;
    }

    .location {
      width: 70%;
    }
  }
`;
