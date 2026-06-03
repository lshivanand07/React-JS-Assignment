const BASE_URl = import.meta.env.VITE_BASE_URL

export async function userOrders() {
  const  token  = localStorage.getItem("token")
 const response = await fetch(`${BASE_URl}/get-user-orders`,{
    method:'GET',
    headers:{
        'Content-Type' : 'aplication/json',
        Authorization : `Bearer ${token}`
    }
         
    })

    if(!response.ok){
       const errorData =  await response.json()
       throw new Error(`${response.status} ${errorData.message}`)
    }

    return response.json()
}