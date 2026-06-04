export interface BambooHRPayload<T> {
  fields: T[];
}

export interface Employee {
  id: string;
  type: string;
  name: string;
}



export interface EmployeeChange {
  id: string;
  action: "Inserted" | "Updated" | "Deleted";
  lastChanged: string; 
}


export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string; 
}
