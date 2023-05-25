import React, { useState } from "react"

interface InputProps extends React.HTMLAttributes<HTMLDivElement>{
  label: string
  name: string
  inputType: string
  propValue: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

export default function Input ({label, name, inputType = 'text',  propValue, changeHandler, ...rest }: InputProps): JSX.Element {
  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    changeHandler(event)
  }

  return (
    <div className="nes-field" {...rest}>
      <label htmlFor={name}>{label}</label>
      {inputType ==='select' ? (
        <div className="nes-select">
          <select onChange={handleUpdate} required id="default_select">
            <option value="" disabled selected hidden>Select...</option>
            <option value="0">To be</option>
            <option value="1">Not to be</option>
          </select>
        </div>)
        : (inputType === 'textarea' 
          ? <textarea name={name} id={name} value={propValue} onChange={handleUpdate} className="nes-textarea"/> 
          : <input type={inputType} name={name} id={name} value={propValue} onChange={handleUpdate} className="nes-input"/>)
      }
    </div>
  )
}