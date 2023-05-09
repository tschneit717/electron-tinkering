interface ButtonProps {
  text: string
  callback: () => any
}

function Button({ text, callback }: ButtonProps): JSX.Element {
  return (
    <button onClick={callback}>{text}</button>
  )
}

export default Button
