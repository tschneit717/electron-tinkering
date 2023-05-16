interface InputProps {
  label: string
  name: string
  value: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input ({label, name, value, changeHandler }: InputProps): JSX.Element {
  return (
    <div className="nes-field">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} value={value} onChange={changeHandler} className="nes-input"/>
    </div>
  )
}