import type React from "react";
import ErrorHandling from "../components/ErrorHandle/Error";

const withErrorHandling = (WrappedComponent:React.ComponentType<any>)=>{

    return function WithErrorHandlingComponent (props:any){
        const{serverError, ...rest} = props

        let serverErrorMessage = ''
        if(serverError instanceof Error){
           serverErrorMessage = serverError.message
        }else if(serverError instanceof TypeError){
           serverErrorMessage = serverError.message
        }else{
            serverErrorMessage = 'Something went wrong'
        }

        if(serverError){
         return <ErrorHandling message={serverErrorMessage}/>
        }
        return <WrappedComponent {...rest}/>
    }
}

export default withErrorHandling