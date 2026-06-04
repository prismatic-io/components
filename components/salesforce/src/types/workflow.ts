
export const filterOperationDescriptions = {
  equals: "Equals",
  notEqual: "Not Equal",
  lessThan: "Less Than",
  greaterThan: "Greater Than",
  lessOrEqual: "Less or Equal",
  greaterOrEqual: "Greater or Equal",
  contains: "Contains",
  notContain: "Not Contains",
  startsWith: "Starts With",
  includes: "Includes",
  excludes: "Excludes",
};
export type FilterOperation = keyof typeof filterOperationDescriptions;



export interface FilterItem {
  
  field: string;
  
  operation: FilterOperation;
  
  value?: string;
  
  valueField?: string;
}

export interface WorkflowAction {
  type: "OutboundMessage";
  
  name: string;
}

export interface CreateWorkflowOutboundMessage {
  fullName: string;
  name: string;
  description: string;
  endpointUrl: string;
  integrationUser: string;
  fields: string[];
  apiVersion: number;
}

export interface CreateWorkflowRule {
  fullName: string;
  active: boolean;
  description: string;
  triggerType: string;
  criteriaItems: FilterItem[];
  actions: WorkflowAction[];
  formula?: string;
}
