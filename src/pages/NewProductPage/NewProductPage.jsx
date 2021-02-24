import React from 'react';
import { Layout } from '../../components/common/Layout';
import { NewProductForm } from '../../components/common/NewProductForm';

export function NewProductPage() {
  return (
    <Layout>
      <h1>Add a new product</h1>
      <NewProductForm />
    </Layout>
  );
}
