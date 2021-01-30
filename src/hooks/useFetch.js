import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../services/api';
import axios from 'axios';
import { useCallback, useState } from 'react';

const BE_API_URL = process.env.REACT_APP_API_URI;

const getHeader = authState => getAuthHeader(authState);

export function useFetch(defaultUrl = BE_API_URL) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const { authState } = useOktaAuth();

  const get = useCallback(
    async (supplementUrl = '') => {
      if (!supplementUrl) throw new Error('No URL provided');
      setStatus('loading');

      try {
        const res = await axios.get(defaultUrl + supplementUrl, {
          headers: getHeader(authState),
        });

        setStatus('success');
        return res;
      } catch (error) {
        setStatus('error');
        setError(error);
      }
    },
    [defaultUrl, authState]
  );

  const post = useCallback(
    async (supplementUrl = '', data = {}) => {
      if (!supplementUrl) throw new Error('No URL provided');
      setStatus('loading');

      try {
        const res = await axios.post(defaultUrl + supplementUrl, data, {
          headers: getHeader(authState),
        });

        setStatus('success');
        return res;
      } catch (error) {
        setStatus('error');
        setError(error);
      }
    },
    [defaultUrl, authState]
  );

  const deleteReq = useCallback(
    async (supplementUrl = '') => {
      if (!supplementUrl) throw new Error('No URL provided');
      setStatus('loading');

      try {
        const res = await axios.delete(defaultUrl + supplementUrl, {
          headers: getHeader(authState),
        });

        setStatus('success');
        return res;
      } catch (error) {
        setStatus('error');
        setError(error);
      }
    },
    [defaultUrl, authState]
  );

  const put = useCallback(
    async (supplementUrl = '', data = {}) => {
      if (!supplementUrl) throw new Error('No URL provided');
      setStatus('loading');

      try {
        const res = await axios.put(defaultUrl + supplementUrl, data, {
          headers: getHeader(authState),
        });

        setStatus('success');
        return res;
      } catch (error) {
        setStatus('error');
        setError(error);
      }
    },
    [defaultUrl, authState]
  );

  return { get, post, deleteReq, put, status, error };
}
