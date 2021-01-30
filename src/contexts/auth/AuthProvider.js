import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvier({ children }) {
  const [oktaMetaData, setOktaMetaData] = useState(null);
  const [oktaId, setOktaId] = useState(null);

  const oktaToken = JSON.parse(localStorage['okta-token-storage']);

  useEffect(() => {
    setOktaMetaData(oktaToken);
    setOktaId(oktaToken.idToken.claims.sub);
  }, []);

  const state = useMemo(
    () => ({
      oktaMetaData,
      oktaId,
    }),
    [oktaMetaData, oktaId]
  );

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
