import './Error.css'

type ErrorProps = {
  message: string

}

function ErrorHandling({message}:Readonly<ErrorProps>){

    return(
        <div className="server-error-div" data-testid="error-component">
          <h2>Error: {message}</h2>
        </div>
    )
}

export default ErrorHandling