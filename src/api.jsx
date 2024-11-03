import axios from 'axios';

axios.defaults.withCredentials = false;

export const instance = axios.create({
  baseURL: 'https://api.eventistry.hub.ke',
  timeout: 5000,
  headers: { 'content-type': 'application/json' }
});