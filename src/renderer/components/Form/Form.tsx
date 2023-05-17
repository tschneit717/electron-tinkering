import { FormEvent, useState } from "react"
import { Button } from "../Button"
import { InputField } from "./Input"
import { SubmissionValues } from "shared/types"


interface FormElement {
  label: string
  name: string
}
interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>, formValues: SubmissionValues) => Promise<void>
  formElements: FormElement[]
  handleReset: () => void
}


export default function Form ({ handleSubmit, formElements, handleReset}: FormProps) {
  const [formValues, setFormValues] = useState({ prompt: '' })
  const [isLoading, toggleIsLoading] = useState(false)
  const handleFormElementUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    toggleIsLoading(true)
    try {
      await handleSubmit(e, formValues);
    } catch (e) {
      console.error(e)
    }
    toggleIsLoading(false)
  }

  return (
    <form onSubmit={submitHandler}>
      {formElements.map((formElement, index) => (
        <InputField className="mb-4" label={formElement.label} name={formElement.name} changeHandler={handleFormElementUpdate}/>
      ))}
      <div className="flex gap-4 mb-4">
        <Button text={'Submit'} disabled={isLoading} status={isLoading ? "disabled" : "success"} type={'submit'}/>
        <Button text={'Reset'} status="warning" type={'button'} callback={handleReset}/>
      </div>
    </form>
  )
}