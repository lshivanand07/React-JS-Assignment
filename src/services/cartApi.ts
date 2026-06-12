import api from './api';

export async function fetchCartDetails() {
  const response = await api.get('/get-user-cart');
  return response.data;
}

interface SelectedItem {
  product_id: number;
  variant_id: number;
  quantity: number;
}

export async function addCartItems(payload: SelectedItem) {
  const response = await api.post('/post-user-cart', payload);
  return response.data;
}

interface deleteCartItemByproductID {
  productID: number;
  variantID: number;
}

export async function deleteCartItem(payload: deleteCartItemByproductID) {
  console.log('payload', payload);

  const response = await api.delete(
    `/delete-cart-product/${payload.productID}/${payload.variantID}`
  );
  return response.data;
}
