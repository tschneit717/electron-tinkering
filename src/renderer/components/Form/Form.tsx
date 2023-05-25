import { FormEvent, useState } from "react"
import { Button } from "../Button"
import { InputField } from "./Input"
import { ChatSubmissionType, SubmissionValues } from "shared/types"


interface FormElement {
  [key: string]: string | string[];
}
interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>, formValues: SubmissionValues) => Promise<void> | void
  formElements: FormElement[]
  handleReset?: () => void
}


export default function Form ({ handleSubmit, formElements, handleReset}: FormProps) {
  const initialSet = {} as FormElement
  formElements.map((element) => { initialSet[!Array.isArray(element) ? element.name : element[1]] = '' })

  const [formValues, setFormValues] = useState(initialSet)
  const [isLoading, toggleIsLoading] = useState(false)
  const handleFormElementUpdate = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues, 
      [event.target.name]: event.target.value
    })
  }
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    toggleIsLoading(true)
    try {
      await handleSubmit(e, formValues as unknown as ChatSubmissionType);
      setFormValues(Object.fromEntries(Object.entries(formValues).map((formValue) => {
        return [formValue[0], formValue[1] = '']
      })))
    } catch (e) {
      console.error(e)
    }
    toggleIsLoading(false)
  }

  return (
    <form onSubmit={submitHandler}>
      {formElements.map((element, index) => {
        console.log(element)
        const label = Object.entries(element)[0][1]
        const name = Object.entries(element)[1][1]
        const type = Object.entries(element)[2][1]
        console.log(label, name, type)
        return <InputField className="mb-4" propValue={formValues[name]} label={label} name={name} inputType={type} changeHandler={handleFormElementUpdate}/>
      })}
      <div className="flex gap-4 mb-4">
        <Button text={'Submit'} disabled={isLoading} status={isLoading ? "disabled" : "success"} type={'submit'}/>
        {handleReset ? <Button text={'Reset'} status="warning" type={'button'} callback={handleReset}/> : <></>}
      </div>
    </form>
  )
}