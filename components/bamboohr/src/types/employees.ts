interface DirectoryField {
  id: string;
  type: string;
  name: string;
}

export interface DirectoryEmployee {
  id: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
}

export interface EmployeeDirectoryResponse {
  fields: DirectoryField[];
  employees: DirectoryEmployee[];
}
