import { ReactNode, type ButtonHTMLAttributes, type DetailedHTMLProps, Fragment } from 'react'
import cn from 'classnames'
import './Button.module.css'
import { BUTTON_ELEMENT_TYPES, BUTTON_TYPES } from 'shared/types'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  status?: BUTTON_TYPES
  as?: BUTTON_ELEMENT_TYPES
  text?: string,
  callback?: () => void
}

const renderElement = (status?: BUTTON_TYPES, as?: BUTTON_ELEMENT_TYPES, callback?: () => void,  children?: ReactNode,  text?: string, rest?: any) => {
  if (as === BUTTON_ELEMENT_TYPES.INPUT) {
    return (
      <input key={text} className={cn(['nes-btn', `is-${status}`])} value={text} type="submit"></input>
    )}
  if (as === BUTTON_ELEMENT_TYPES.A) {
    return (
      <a key={text} className={cn(['nes-btn', `is-${status}`])} {...rest}>{children ?? text}</a>
    )}
  return (
    <button key={text} className={cn(['nes-btn', `is-${status}`])} {...rest} onClick={callback}>{children ?? text }</button>
  )
}

function ButtonComponent({ text, status, callback, as = BUTTON_ELEMENT_TYPES.BUTTON, children, ...rest }: ButtonProps): JSX.Element {
  return (<Fragment key={`${text}-${status}`}>{renderElement(status, as, callback, children, text, rest)}</Fragment>)
}

export default ButtonComponent
