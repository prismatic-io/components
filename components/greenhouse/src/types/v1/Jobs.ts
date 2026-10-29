import type { DepartmentDataSources } from "./Departments";
import type { OfficeDataSources } from "./Offices";

export interface JobDataSources {
  id: number;
  name: string;
  requisition_id: string;
  notes: string;
  confidential: boolean;
  status: string;
  created_at: string;
  opened_at: string;
  closed_at: string;
  updated_at: string;
  is_template: boolean;
  copied_from_id: number;
  departments: DepartmentDataSources[];
  offices: OfficeDataSources[];
  custom_fields: CustomFields;
  keyed_custom_fields: KeyedCustomFields;
  hiring_team: HiringTeam;
  openings: Opening[];
}

export interface CustomFields {
  employment_type: string;
  maximum_budget: string;
  salary_range: ValueClass;
}

export interface ValueClass {
  min_value: number;
  max_value: number;
  unit: string;
}

export interface HiringTeam {
  hiring_managers: Coordinator[];
  recruiters: Coordinator[];
  coordinators: Coordinator[];
  sourcers: Coordinator[];
}

export interface Coordinator {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  employee_id: string;
  responsible?: boolean;
}

export interface KeyedCustomFields {
  employment_type: Budget;
  budget: Budget;
  salary_range: KeyedCustomFieldsSalaryRange;
}

export interface Budget {
  name: string;
  type: string;
  value: string;
}

export interface KeyedCustomFieldsSalaryRange {
  name: string;
  type: string;
  value: ValueClass;
}

export interface Opening {
  id: number;
  opening_id: null | string;
  status: string;
  opened_at: string;
  closed_at: null | string;
  application_id: number | null;
  close_reason?: CloseReason | null;
}

export interface CloseReason {
  id: number;
  name: string;
}
