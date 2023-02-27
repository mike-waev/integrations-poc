export interface TypeformWebhookResponse {
  event_id: string;
  event_type: string;
  form_response: FormResponse;
}

export interface FormResponse {
  form_id: string;
  token: string;
  submitted_at: Date;
  landed_at: Date;
  calculated: Calculated;
  variables: Variable[];
  hidden: Hidden;
  definition: Definition;
  answers: Answer[];
}

export interface Answer {
  type: string;
  text?: string;
  field: AnswerField;
  email?: string;
  date?: Date;
  choices?: Choices;
  number?: number;
  boolean?: boolean;
  choice?: Choice;
  url?: string;
}

export interface Choice {
  label: string;
}

export interface Choices {
  labels: string[];
}

export interface AnswerField {
  id: string;
  type: string;
  ref?: string;
}

export interface Calculated {
  score: number;
}

export interface Definition {
  id: string;
  title: string;
  fields: FieldElement[];
}

export type TypeFormFieldType =
  | "choices"
  | "choice"
  | "text"
  | "email"
  | "text"
  | "date"
  | "number"
  | "boolean"
  | "url";

export interface FieldElement {
  id: string;
  title: string;
  type: TypeFormFieldType;
  ref: string;
  allow_multiple_selections?: boolean;
  allow_other_choice?: boolean;
  properties?: Properties;
}

export interface Properties {}

export interface Hidden {
  user_id: string;
}

export interface Variable {
  key: string;
  type: string;
  number?: number;
  text?: string;
}
