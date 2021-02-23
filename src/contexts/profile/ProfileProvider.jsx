import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { types, profileReducer, initialState } from './state';

import { useFetch } from '../../hooks/useFetch';
import { useOktaAuth } from '@okta/okta-react';
import { useOktaId } from '../../hooks/useOktaId';

export const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [loaded, setLoaded] = useState(false);

  const { get } = useFetch();
  const { oktaId } = useOktaId();
  const { authState, authService } = useOktaAuth();

  useEffect(
    function getProfile() {
      if (oktaId && !authState.isPending) {
        async function asyncFetch() {
          const res = await get(`profile/${oktaId}`);
          dispatch({ type: types.GET_PROFILE, payload: res?.data });
          setLoaded(true);
        }

        asyncFetch();
      }
    },
    [authState, authService, oktaId, get]
  );

  useEffect(
    function getStores() {
      if (oktaId && !authState.isPending) {
        async function asyncFetch() {
          const res = await get(`profile/${oktaId}/stores`);
          dispatch({ type: types.GET_STORES, payload: res?.data });
          setLoaded(true);
        }

        asyncFetch();
      }
    },
    [authState, authService, oktaId, get]
  );

  const memoizedState = useMemo(() => ({ ...state, loaded, dispatch, types }), [
    state,
    loaded,
    dispatch,
  ]);

  return (
    <ProfileContext.Provider value={memoizedState}>
      {children}
    </ProfileContext.Provider>
  );
}
