const BASE_URL = import.meta.env.VITE_BASE_URL

export async function checkoutOrder(payment_method_name:string) {
   const  token  = localStorage.getItem("token")
   const response =  await fetch(`${BASE_URL}/checkout-orderItem`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body:JSON.stringify({
            payment_method_name
        })
    })

    return response.json()
}