const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchProductById(productId:number) {

  const response = await fetch(`${BASE_URL}/get-one-products/${productId}`, {
    method: 'GET',
  });

    const data = await response.json();

     if (!response.ok) {
      throw new Error(data.message);
    }

  return data;
}

export default fetchProductById;