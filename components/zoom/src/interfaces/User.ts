export interface User {
  user_created_at: string;
  custom_attributes: CustomAttribute[];
  dept: string;
  email: string;
  employee_unique_id: string;
  first_name: string;
  group_ids: string[];
  host_key: string;
  id: string;
  im_group_ids: string[];
  last_client_version: string;
  last_login_time: string;
  last_name: string;
  plan_united_type: string;
  pmi: number;
  role_id: string;
  status: string;
  timezone: string;
  type: number;
  verified: number;
  display_name: string;
}

interface CustomAttribute {
  key: string;
  name: string;
  value: string;
}
