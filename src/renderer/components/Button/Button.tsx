import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string
  callback?: () => any
}

function Button({ text, callback, ...rest }: ButtonProps): JSX.Element {
  return (
    <button {...rest} onClick={callback}>{text}</button>
  )
}

export default Button
