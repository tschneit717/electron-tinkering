import { FormEvent, useState } from "react"
import { Button } from "../Button"
import { InputField } from "./Input"
import { ChatSubmissionType } from "shared/types"
import { FormElement, FormProps } from "./Form.interface"

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
        const labelArr = Object.entries(element)[0]
        const nameArr = Object.entries(element)[1]
        const typeArr = Object.entries(element)[2] ?? ['type', 'text']
        const selectFieldsArr = Object.entries(element)[3] as string[]
        const label = labelArr[1] as string
        const name = nameArr[1] as string
        const type = typeArr[1] as string
        const selectFields = selectFieldsArr ? selectFieldsArr[1] : [] as string[]
        return <InputField className="mb-4" selectFields={selectFields as string[]} propValue={formValues[name]as string} label={label} name={name} inputType={type} changeHandler={handleFormElementUpdate}/>
      })}
      <div className="flex gap-4 mb-4">
        <Button text={'Submit'} disabled={isLoading} status={isLoading ? "disabled" : "success"} type={'submit'}/>
        {handleReset ? <Button text={'Reset'} status="warning" type={'button'} callback={handleReset}/> : <></>}
      </div>
    </form>
  )
}