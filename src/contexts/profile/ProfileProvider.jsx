import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { types, providerReducer, initialState } from './state';

import { useFetch } from '../../hooks/useFetch';
import { useOktaAuth } from '@okta/okta-react';
import { useOktaId } from '../../hooks/useOktaId';

export const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(providerReducer, initialState);

  const { get } = useFetch();
  const { oktaId } = useOktaId();
  const { authState, authService } = useOktaAuth();

  useEffect(
    function getProfile() {
      async function asyncFetch() {
        const res = await get(`profile/${oktaId}`);
        dispatch({ type: types.GET_PROFILE, payload: res.data });
      }

      asyncFetch();
    },
    [authState, authService]
  );

  useEffect(
    function getStores() {
      async function asyncFetch() {
        const res = await get(`profile/${oktaId}/stores`);
        dispatch({ type: types.GET_STORES, payload: res.data });
      }

      asyncFetch();
    },
    [authState, authService]
  );

  const memoizedState = useMemo(() => ({ ...state }), [state]);

  return (
    <ProfileContext.Provider value={memoizedState}>
      {children}
    </ProfileContext.Provider>
  );
}
