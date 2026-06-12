import api from './api';

export async function fetchUserById() {
  const response = await api.get('/get-my-info');
  return response.data;
}
