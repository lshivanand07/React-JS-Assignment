import api from './api';

export async function allOrders() {
  const response = await api.get('/get-all-orders');
  return response.data;
}

export async function userOrders() {
  const response = await api.get('/get-user-orders');
  return response.data;
}
