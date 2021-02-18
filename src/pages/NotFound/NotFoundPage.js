import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <h1>404 Page Not Found</h1>
      <Link to="/">
        <button>Back To Home</button>
      </Link>
    </Layout>
  );
};

export default NotFoundPage;
