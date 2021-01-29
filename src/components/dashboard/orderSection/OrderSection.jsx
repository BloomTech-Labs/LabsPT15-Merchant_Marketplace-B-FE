import React from 'react';
import { Link } from 'react-router-dom';
import { OrderCard } from '../../common/OrderCard';

export function OrderSection() {
  console.log('placeholder');
  return (
    <>
      <h2>Orders</h2>
      <h4>Active</h4>
      <OrderCard
        orderNumber="#1"
        name="Name McName"
        status="Pick-Up"
        price={3.33}
        itemCount={9}
      />
      <Link className="activeLink">
        <p className="activeLink">All Active Orders</p>
      </Link>
      <h4>Fullfiled & cancelled</h4>
      <OrderCard
        orderNumber="#0"
        name="Name McName"
        status="Pick-Up"
        price={3.33}
        itemCount={9}
      />
    </>
  );
}

// This comment is to commit the change to the folder name so they are uniform.
