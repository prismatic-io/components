export interface Response {
  answers: Answer[];
  calculated: Calculated;
  hidden: Record<string, unknown>;
  landed_at: string;
  landing_id: string;
  metadata: Metadata;
  response_id: string;
  submitted_at: string;
  token: string;
  variables: Variable[];
}

export interface Answer {
  field: Field;
  text?: string;
  type: string;
  boolean?: boolean;
  email?: string;
  number?: number;
  choices?: Choices;
  date?: string;
  choice?: Choice;
}

export interface Choice {
  label: string;
}

export interface Choices {
  labels: string[];
}

export interface Field {
  id: string;
  ref: string;
  type: string;
}

export interface Calculated {
  score: number;
}

export interface Metadata {
  browser: string;
  network_id: string;
  platform: string;
  referer: string;
  user_agent: string;
}

export interface Variable {
  key: string;
  number?: number;
  type: string;
  text?: string;
}
