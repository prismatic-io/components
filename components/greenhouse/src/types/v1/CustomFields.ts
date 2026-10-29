export interface CustomFieldDataSources {
  id: number;
  name: string;
  active: boolean;
  field_type: string;
  priority: number;
  value_type: string;
  private: boolean;
  required: boolean;
  require_approval: boolean;
  trigger_new_version: boolean;
  name_key: string;
  description: string;
  expose_in_job_board_api: boolean;
  api_only: boolean;
  offices: unknown[];
  departments: unknown[];
  template_token_string: string;
  custom_field_options: CustomFieldOption[];
}

export interface CustomFieldOption {
  id: number;
  name: string;
  priority: number;
  external_id: null | string;
}
