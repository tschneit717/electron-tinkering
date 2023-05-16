import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'
import cn from 'classnames'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string,
  status: 'primary' | 'success' | 'warning' | 'error' | 'disabled'
  callback?: () => void
}

function Button({ text, status = 'primary', callback, ...rest }: ButtonProps): JSX.Element {
  return (
    <button className={cn(['nes-btn', `is-${status}`])} {...rest} onClick={callback}>{text}</button>
  )
}

export default Button
