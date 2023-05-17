import React, { useState } from "react"

interface InputProps extends React.HTMLAttributes<HTMLDivElement>{
  label: string
  name: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input ({label, name, changeHandler, ...rest }: InputProps): JSX.Element {
  const [value, setValue] = useState('')

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    changeHandler(event)
  }

  return (
    <div className="nes-field" {...rest}>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={name} value={value} onChange={handleUpdate} className="nes-input"/>
    </div>
  )
}