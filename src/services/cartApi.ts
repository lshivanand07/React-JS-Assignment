const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchCartDetails() {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/get-user-cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

    const data = await response.json();

     if (!response.ok) {
      throw new Error(data.message);
    }

  return data;
}

export async function addCartItems(product_id:number, quantity:number, variant_id:number) {
    const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/post-user-cart`, {
    method: 'POST',
   headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
    body:JSON.stringify({
        product_id,
        quantity,
        variant_id
    })
  });

    const data = await response.json();

     if (!response.ok) {
      throw new Error(data.message);
    }

  return data;
}
