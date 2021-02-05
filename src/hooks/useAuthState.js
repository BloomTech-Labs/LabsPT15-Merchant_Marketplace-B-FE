import { useOktaAuth } from '@okta/okta-react/src/OktaContext';
import { useState, useEffect } from 'react';

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { authState, authService } = useOktaAuth();

  useEffect(
    function getAuthenticationState() {
      if (authState.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    },
    [authState, authService]
  );

  return { isAuthenticated };
}
