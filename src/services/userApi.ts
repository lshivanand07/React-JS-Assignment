const BASE_URL = import.meta.env.VITE_BASE_URL

export async function fetchUserById (){
const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/get-my-info`,{
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