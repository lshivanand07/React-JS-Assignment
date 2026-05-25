import './Button.css'
type ButtonProps = {
  text: string
  onClick?: () => void
}

function Button({ text, onClick }: Readonly<ButtonProps>) {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button