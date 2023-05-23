import React, { useState } from "react"

interface InputProps extends React.HTMLAttributes<HTMLDivElement>{
  label: string
  name: string
  propValue: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input ({label, name, propValue, changeHandler, ...rest }: InputProps): JSX.Element {
  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(event)
  }

  return (
    <div className="nes-field" {...rest}>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={name} value={propValue} onChange={handleUpdate} className="nes-input"/>
    </div>
  )
}