const BASE_URL = import.meta.env.VITE_BASE_URL

async function checkout() {
   const  token  = localStorage.getItem("token")
    await fetch(`${BASE_URL}/checkout-orderItem`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
}