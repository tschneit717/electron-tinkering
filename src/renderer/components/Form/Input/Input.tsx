import { ChangeEvent, HTMLAttributes } from "react"

interface InputProps extends HTMLAttributes<HTMLDivElement>{
  label: string
  name: string
  propValue: string
  changeHandler: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  inputType?: string
  selectFields?: string[]
}

export default function Input ({label, name, selectFields, inputType = 'text',  propValue, changeHandler, ...rest }: InputProps): JSX.Element {
  const handleUpdate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    changeHandler(event)
  }

  return (
    <div className="nes-field" {...rest}>
      <label htmlFor={name}>{label}</label>
      {inputType ==='select' ? (
        <div className="nes-select">
          <select onChange={handleUpdate} required id="default_select">
            <option value="" disabled selected hidden>Select...</option>
            {selectFields ? selectFields.map((field) => {
              return <option value={field}>{field}</option>
            }) : <></> }
          </select>
        </div>)
        : (inputType === 'textarea' 
          ? <textarea name={name} id={name} value={propValue} onChange={handleUpdate} className="nes-textarea"/> 
          : <input type={inputType} name={name} id={name} value={propValue} onChange={handleUpdate} className="nes-input"/>)
      }
    </div>
  )
}