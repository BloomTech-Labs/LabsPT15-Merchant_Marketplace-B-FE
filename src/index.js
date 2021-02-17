import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import 'antd/dist/antd.less';

import { NotFoundPage } from './pages/NotFound';

import { LoginPage } from './pages/Login';
import { config } from './services/okta/oktaConfig';

// Seller Imports
import SellerProfile from './pages/SellerProfilePage';
import { InventoryPage } from './pages/InventoryPage';
import { Landing } from './pages/Landing';
import { CurrentInventory } from './pages/CurrentInventory/CurrentInventory';
import { ProductPage } from './pages/ProductPage';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { NewStorePage } from './pages/NewStorePage';
import { StoresPage } from './pages/StoresPage';
import { ProfileProvider } from './contexts';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
        <GlobalStyles />
      </ThemeProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <ProfileProvider>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/implicit/callback" component={LoginCallback} />
          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <Route path="/" exact component={Landing} />
          <SecureRoute exact path="/stores" component={StoresPage} />
          <SecureRoute exact path="/myprofile" component={SellerProfile} />
          <SecureRoute
            exact
            path="/myprofile/inventory"
            component={CurrentInventory}
          />
          <SecureRoute
            exact
            path="/myprofile/inventory/additem"
            component={InventoryPage}
          />
          <SecureRoute exact path="/new-store" component={NewStorePage} />
          <SecureRoute
            exact
            path="/myprofile/inventory/productpage/:id"
            render={routeProps => {
              return <ProductPage match={routeProps.match} />;
            }}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </ProfileProvider>
    </Security>
  );
}
