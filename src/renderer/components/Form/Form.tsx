import { FormEvent, useState } from "react"
import { Button } from "../Button"
import { InputField } from "./Input"
import { BUTTON_ELEMENT_TYPES, BUTTON_TYPES, ChatSubmissionType } from "shared/types"
import { FormElement, FormProps } from "./Form.interface"
import { SyntheticEvent } from "react"

export default function Form ({ formElements, formButtons, error}: FormProps) {
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

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    toggleIsLoading(true)
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLInputElement;
    const action = formButtons.find((button) => button.label === submitter.value)?.callback
    try {
      if (action) {
        action(e, formValues as unknown as ChatSubmissionType)
      }
      setFormValues(Object.fromEntries(Object.entries(formValues).map((formValue) => {
        return [formValue[0], formValue[1] = '']
      })))
    } catch (e) {
      console.error(e)
    }
    toggleIsLoading(false)
  }

  return (

    <>
     
      <form onSubmit={submitHandler}>
        {formElements.map((element, index) => {
          const labelArr = Object.entries(element)[0]
          const nameArr = Object.entries(element)[1]
          const typeArr = Object.entries(element)[2] ?? ['type', 'text']
          const selectFieldsArr = Object.entries(element)[3] as string[]
          const label = labelArr[1] as string
          const name = nameArr[1] as string
          const type = typeArr[1] as string
          const selectFields = selectFieldsArr ? selectFieldsArr[1] : [] as string[]
          return <InputField key={name} className="mb-4" selectFields={selectFields as string[]} propValue={formValues[name]as string} label={label} name={name} inputType={type} changeHandler={handleFormElementUpdate}/>
        })}
        {error ? <p className="nes-text text-red-500 mb-4">{error}</p> : <> </>}
        <div className="flex flex-wrap gap-4 mb-4">
          {formButtons.map((button) => {
            return <Button key={button.label} as={BUTTON_ELEMENT_TYPES.INPUT} text={button.label} disabled={isLoading} status={isLoading ? BUTTON_TYPES.DISABLED : button.type} type={'submit'}/>
          })}
        </div>
      </form>
    </>
  )
}