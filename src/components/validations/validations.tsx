const validateSignup = (name:string, email:string, password:string, confirmPassword:string) => {
 
 if (!name.trim()) {
    return 'Name is required';
  }

   const emailPattern = /([a-z]+)([@]{1})([a-z]+)([.]{1})([a-z]+)/

    if(email===""){
       return "Email field is mandatory"
    }
    else if(!(emailPattern.test(email))){
        return "please enter valid email"
    }

    const passwordPattern = /([A-Z]+)([a-z]+)([@$&]?)([0-9]+)/
    if(password===""){
      return "Password field is mandatory*"
    }
    else if(password.length < 8){
       return "Password must be at least 8 characters long."
    }
    else if(!(passwordPattern.test(password))){
      return "Must contain at least one uppercase letter,  Must contain at least one lowercase letter,  Must contain at least one digit"
    }
    
    if(confirmPassword===""){
       return "Confirm Password field is mandatory*"
    }
    else if(confirmPassword!==password){
       return "Confirm Password did not match"
    }

    if(emailPattern.test(email) && passwordPattern.test(password) && password.length >= 8 && confirmPassword===password){

          console.log("hi")
    }

}

export default validateSignup