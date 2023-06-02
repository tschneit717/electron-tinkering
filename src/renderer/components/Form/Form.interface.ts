import { FormEvent, SyntheticEvent } from "react";
import { BUTTON_TYPES, SubmissionValues } from "shared/types";

export interface FormElement {
  [key: string]: string | string[];
}
export interface FormProps {
  formElements: FormElement[]
  formButtons: {
    label: string
    callback: (e: SyntheticEvent<Element, Event>, formValues: SubmissionValues) => Promise<void> | void
    type: BUTTON_TYPES
  }[]
  error?: string 
}
