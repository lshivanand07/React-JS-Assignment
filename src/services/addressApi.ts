const BASE_URL = import.meta.env.VITE_BASE_URL

export async function fetchUserAddressById (){
const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/get-user-address`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json',
        Authorization : `Bearer ${token}`
    }
  })

  if (!response.ok) {
  const errorData = await response.json();
  throw new Error(`${response.status} ${errorData.message}`);
}

  return await response.json()

}

export async function createUserAddress (country:string, state:string, districts:string, city:string, street:string, landmark:string, pincode:string, addressType:string) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/post-user-address`,{
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
        Authorization : `Bearer ${token}`
    },
    body:JSON.stringify({
        country, state, districts, city,
        street, landmark, pincode, addressType
    })
  })

  if (!response.ok) {
  const errorData = await response.json();
  throw new Error(`${response.status} ${errorData.message}`);
}

  return await response.json()

}