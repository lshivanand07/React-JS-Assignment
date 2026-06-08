const BASE_URL = import.meta.env.VITE_BASE_URL 

async function CreateUser(user_name:string, email:string, password:string){
    const response = await fetch(`${BASE_URL}/post-one-user`,{
       method:'POST',
     headers: {
        'Content-Type': 'application/json'
      },
    body:JSON.stringify({
        user_name,
        email,
        password
    })
    }
    )
    return await response.json()
}

export default CreateUser