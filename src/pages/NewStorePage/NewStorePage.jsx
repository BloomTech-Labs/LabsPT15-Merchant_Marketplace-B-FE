import React from 'react';
import { Layout } from '../../components/common/Layout';
import { NewStoreForm } from '../../components/dashboard/NewStoreForm';

export function NewStorePage() {
  return (
    <Layout>
      <h1>Create a new store</h1>
      <NewStoreForm />
    </Layout>
  );
}
