import { useOktaAuth } from '@okta/okta-react/src/OktaContext';
import { useEffect, useState } from 'react';

export function useOktaId() {
  const [oktaId, setOktaId] = useState(null);
  const { authService, authState } = useOktaAuth();

  useEffect(
    function fetchUser() {
      async function asyncFetch() {
        if (!authState.isPending) {
          const oktaUser = await authService.getUser();
          setOktaId(oktaUser?.sub);
        }
      }

      if (authService) {
        asyncFetch();
      }
    },
    [authService, authState]
  );

  return { oktaId };
}
