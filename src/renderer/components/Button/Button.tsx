import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'
import cn from 'classnames'
import './Button.module.css'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  status: 'primary' | 'success' | 'warning' | 'error' | 'disabled' | 'dark' | 'standard'
  text?: string,
  callback?: () => void
}

function Button({ text, status = 'primary', callback, children, ...rest }: ButtonProps): JSX.Element {
  return (
    <button className={cn(['nes-btn', `is-${status}`])} {...rest} onClick={callback}>{text ?? children}</button>
  )
}

export default Button
