import api from './api';

export async function fetchUserById() {
  const response = await api.get('/get-my-info');
  return response.data;
}

export async function fetchAllUser() {
  const response = await api.get('/get-all-users');
  return response.data;
}
