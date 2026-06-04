export interface EmployeeSearchResponse {
  employees: Employee[];
}

export interface Employee {
  fullName: string;
  "/root/fullName": {
    value: string;
  };
  id: string;
}
