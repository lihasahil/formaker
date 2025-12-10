export interface FormOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type:
    | "text"
    | "email"
    | "number"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox";
  required: boolean;
  options?: FormOption[];
  validation?: string;
}

export interface FormSchema {
  formTitle?: string;
  title?: string;
  formSubtitle?: string;
  subtitle?: string;
  fields: FormField[];
}
