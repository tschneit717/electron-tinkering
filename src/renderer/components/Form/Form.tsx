import { FormEvent, useState } from "react"
import { Button } from "../Button"
import { InputField } from "./Input"


interface FormElement {
  label: string
  name: string
}
interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  formElements: FormElement[]
  handleReset: () => void
}


export default function Form ({ handleSubmit, formElements, handleReset}: FormProps) {
  const [formValues, setFormValues] = useState({})
  const handleFormElementUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit.bind(formValues)} className="Hello">
      {formElements.map((formElement, index) => (
        <InputField label={formElement.label} name={formElement.name} changeHandler={handleFormElementUpdate}/>
      ))}
      <Button text={'Submit'} status="success" type={'submit'}/>
      <Button text={'Reset'} status="warning" type={'button'} callback={handleReset}/>
    </form>
  )
}