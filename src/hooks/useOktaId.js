import { useOktaAuth } from '@okta/okta-react/src/OktaContext';
import { useEffect, useState } from 'react';

export function useOktaId() {
  const [oktaId, setOktaId] = useState(null);
  const { authState, authService } = useOktaAuth();

  useEffect(
    function fetchUser() {
      async function asyncFetch() {
        const oktaUser = await authService.getUser();
        setOktaId(oktaUser?.sub);
      }

      asyncFetch();
    },
    [authState, authService]
  );

  return { oktaId };
}
