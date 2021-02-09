import React from 'react';
import { ItemCard } from '../../common/ItemCard';
import useSearch from '../../../hooks/useSearch';
import { NavLink } from 'react-router-dom';

export function SearchResults({ data, filter }) {
  const searchData = useSearch(data, 'name', filter);

  return (
    <div>
      {searchData.map(item => (
        <NavLink to={`/myprofile/inventory/productpage/${item.id}`}>
          <ItemCard
            id={item.id}
            key={item.id}
            name={item.item_name}
            price={item.price_in_cents}
            description={item.description}
            count={item.quantity_available}
            imageId={item.id}
          />
        </NavLink>
      ))}
    </div>
  );
}