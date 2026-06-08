const BASE_URL = import.meta.env.VITE_BASE_URL

export async function checkoutOrder() {
   const  token  = localStorage.getItem("token")
   const response =  await fetch(`${BASE_URL}/checkout-orderItem`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })

    return response.json()
}