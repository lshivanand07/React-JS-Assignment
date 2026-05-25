const BASE_URL = import.meta.env.VITE_BASE_URL 

async function fetchLoginDetails (email:string, password:string) {
   const response = await fetch(`${BASE_URL}/login`,{
    method:'POST',
     headers: {
        'Content-Type': 'application/json'
      },
    body:JSON.stringify({
        email,
        password
    })
   })
   
return await response.json()
   }

export default fetchLoginDetails