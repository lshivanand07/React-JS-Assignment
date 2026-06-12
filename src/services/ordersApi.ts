import api from './api';

export async function userOrders() {
  const response = await api.get('/get-user-orders');
  return response.data;
}
