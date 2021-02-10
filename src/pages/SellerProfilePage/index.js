import React from 'react';
import { Layout } from '../../components/common/Layout/Layout';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { useProfile } from '../../contexts/profile/ProfileProvider';

function SellerProfile() {
  const { stores, profile } = useProfile();

  console.log({ stores, profile });

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default SellerProfile;
