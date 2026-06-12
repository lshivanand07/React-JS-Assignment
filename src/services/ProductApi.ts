import api from './api';

export async function fetchProductDetails() {
  const response = await api.get(`/get-all-products`);
  return response.data;
}

export async function fetchProductById(productId: number) {
  const response = await api.get(`/get-one-products/${productId}`);
  return response.data;
}
