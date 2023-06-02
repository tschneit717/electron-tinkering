import { ChangeEvent, HTMLAttributes, useContext } from "react"
import { ViewContext } from "renderer/context/viewContext"

interface InputProps extends HTMLAttributes<HTMLDivElement>{
  label: string
  name: string
  propValue: string
  changeHandler: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  inputType?: string
  selectFields?: string[]
}

export default function Input ({label, name, selectFields, inputType = 'text',  propValue, changeHandler, ...rest }: InputProps): JSX.Element {
  const viewContext = useContext(ViewContext)
  const { isDark } = viewContext
  const handleUpdate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    changeHandler(event)
  }

  return (
    <div className="nes-field" {...rest}>
      <label htmlFor={name}>{label}</label>
      {inputType ==='select' ? (
        <div className={`nes-select ${isDark ? 'is-dark' : ''}`}>
          <select onChange={handleUpdate} name={name} id="default_select">
            <option value="" hidden></option>
            {selectFields ? selectFields.map((field) => {
              return <option key={field} value={field}>{field}</option>
            }) : <></> }
          </select>
        </div>)
        : (inputType === 'textarea' 
          ? <textarea name={name} id={name} value={propValue} onChange={handleUpdate} className={`nes-textarea ${isDark ? 'is-dark' : ''}`}/> 
          : <input type={inputType} name={name} id={name} value={propValue} onChange={handleUpdate} className={`nes-input ${isDark ? 'is-dark' : ''}`}/>)
      }
    </div>
  )
}