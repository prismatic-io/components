import type { DepartmentDataSources } from "./Departments";
import type { OfficeDataSources } from "./Offices";

export interface UserDataSources {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  primary_email_address: string;
  updated_at: string;
  created_at: string;
  disabled: boolean;
  site_admin: boolean;
  emails: string[];
  employee_id: string;
  linked_candidate_ids: number[];
  offices: OfficeDataSources[];
  departments: DepartmentDataSources[];
}
