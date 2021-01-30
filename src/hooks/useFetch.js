import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../services/api';
import axios from 'axios';
import { useState } from 'react';

const BE_API_URL = process.env.REACT_APP_API_URI;

export function useFetch(defaultUrl = BE_API_URL) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const { authState } = useOktaAuth();
  const header = getAuthHeader(authState);

  async function get(supplementUrl = '') {
    if (!supplementUrl) throw new Error('No URL provided');
    setStatus('loading');

    try {
      const res = await axios.get(defaultUrl + supplementUrl, {
        headers: header,
      });

      setStatus('success');
      return res;
    } catch (error) {
      setStatus('error');
      setError(error);
    }
  }

  async function post(supplementUrl = '', data = {}) {
    if (!supplementUrl) throw new Error('No URL provided');
    setStatus('loading');

    try {
      const res = await axios.post(defaultUrl + supplementUrl, data, {
        headers: header,
      });

      setStatus('success');
      return res;
    } catch (error) {
      setStatus('error');
      setError(error);
    }
  }

  async function deleteReq(supplementUrl = '') {
    if (!supplementUrl) throw new Error('No URL provided');
    setStatus('loading');

    try {
      const res = await axios.delete(defaultUrl + supplementUrl, {
        headers: header,
      });

      setStatus('success');
      return res;
    } catch (error) {
      setStatus('error');
      setError(error);
    }
  }

  async function put(supplementUrl = '', data = {}) {
    if (!supplementUrl) throw new Error('No URL provided');
    setStatus('loading');

    try {
      const res = await axios.put(defaultUrl + supplementUrl, data, {
        headers: header,
      });

      setStatus('success');
      return res;
    } catch (error) {
      setStatus('error');
      setError(error);
    }
  }

  return { get, post, deleteReq, put, status, error };
}
