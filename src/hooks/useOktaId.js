import { useOktaAuth } from '@okta/okta-react/src/OktaContext';
import { useEffect, useState } from 'react';

export function useOktaId() {
  const [oktaId, setOktaId] = useState(null);
  const { authService } = useOktaAuth();

  useEffect(
    function fetchUser() {
      async function asyncFetch() {
        const oktaUser = await authService.getUser();
        setOktaId(oktaUser?.sub);
      }

      if (authService) {
        asyncFetch();
      }
    },
    [authService]
  );

  return { oktaId };
}
