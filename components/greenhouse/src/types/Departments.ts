export interface DepartmentDataSources {
  id: number;
  name: string;
  parent_id: number;
  parent_department_external_id: string;
  child_ids: number[];
  child_department_external_ids: string[];
  external_id: string;
}
