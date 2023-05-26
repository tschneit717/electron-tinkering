import { FormEvent } from "react";
import { SubmissionValues } from "shared/types";

export interface FormElement {
  [key: string]: string | string[];
}
export interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>, formValues: SubmissionValues) => Promise<void> | void
  formElements: FormElement[]
  handleReset?: () => void
}
