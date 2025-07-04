export interface IFormControl {
  name: string
  label: string
  id: number
  placeholder: string
  nextElement: any[]
  dynamicNextElement: any[]
  type: string
  required: boolean
  validation: Validation[]
  errorMessage: ErrorMessage
  value: string
  disabled: boolean
  hidden: boolean
  readonly: boolean
  class: string,
  addDynamically: boolean
}

export interface Validation {
  required: boolean
  minlength: number
  maxlength: number
}

export interface ErrorMessage {
  required: string
  minlength: string
  maxlength: string
}
