export interface Registrant {
  id: string;
  address: string;
  city: string;
  comments: string;
  country: string;
  custom_questions: { title: string; value: string }[];
  email: string;
  first_name: string;
  industry: string;
  job_title: string;
  last_name: string;
  no_of_employees: string;
  org: string;
  phone: string;
  purchasing_time_frame: string;
  role_in_purchase_process: string;
  state: string;
  status: string;
  zip: string;
  create_time: string;
  join_url: string;
  participant_pin_code?: number;
}
