

export interface CandidateParams {
  per_page?: string;
  page?: string;
  created_before?: string;
  created_after?: string;
  updated_before?: string;
  updated_after?: string;
  job_id?: string;
  email?: string;
  candidate_ids?: string;
}

export interface CandidateDataSources {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_activity: string;
  is_private: boolean;
  photo_url: string | null;
  attachments: Attachment[];
  application_ids: number[];
  phone_numbers: Address[];
  addresses: Address[];
  email_addresses: Address[];
  website_addresses: Address[];
  social_media_addresses: unknown[];
  recruiter: Recruiter;
  coordinator: unknown;
  can_email: boolean;
  tags: string[];
  applications: Application[];
  educations: Education[];
  employments: Employment[];
  linked_user_ids: number[];
  custom_fields: CustomFields;
  keyed_custom_fields: KeyedCustomFields;
}

export interface Address {
  value: string;
  type: string;
}

export interface Application {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: string;
  rejected_at: null;
  last_activity_at: string;
  location: Location | null;
  source: Source;
  credited_to: Recruiter;
  rejection_reason: null;
  rejection_details: null;
  jobs: CurrentStage[];
  job_post_id?: number;
  status: string;
  current_stage: CurrentStage | null;
  answers: unknown[];
  prospective_office: null;
  prospective_department: null;
  prospect_detail: ProspectDetail;
  attachments: Attachment[];
}

export interface Attachment {
  filename: string;
  url: string;
  type: string;
  created_at: string;
}

export interface Recruiter {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  employee_id: null;
}

export interface CurrentStage {
  id: number;
  name: string;
}

export interface Location {
  address: string;
}

export interface ProspectDetail {
  prospect_pool: CurrentStage | null;
  prospect_stage: CurrentStage | null;
  prospect_owner: CurrentStage | null;
}

export interface Source {
  id: number;
  public_name: string;
}

export interface CustomFields {
  desired_salary: string;
  work_remotely: boolean;
  graduation_year: string;
}

export interface Education {
  id: number;
  school_name: string;
  degree: string;
  discipline: string;
  start_date: string;
  end_date: string;
}

export interface Employment {
  id: number;
  company_name: string;
  title: string;
  start_date: string;
  end_date: string;
}

export interface KeyedCustomFields {
  desired_salary: DesiredSalary;
  work_remotely: WorkRemotely;
  graduation_year_1: DesiredSalary;
}

export interface DesiredSalary {
  name: string;
  type: string;
  value: string;
}

export interface WorkRemotely {
  name: string;
  type: string;
  value: boolean;
}
