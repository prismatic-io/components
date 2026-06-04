export interface PagedResponse<T> {
  values: T[];
  start: number;
  limit: number;
  isLastPage: boolean;
  size?: number;
  _links?: Record<string, unknown>;
  _expands?: string[];
}

export interface ServiceDesk {
  id: string;
  projectId: string;
  projectName: string;
  projectKey: string;
  _links?: Record<string, unknown>;
}

export interface RequestType {
  id: string;
  name: string;
  description: string;
  helpText?: string;
  issueTypeId: string;
  serviceDeskId: string;
  groupIds?: string[];
  icon?: { id: string; _links?: Record<string, unknown> };
  _links?: Record<string, unknown>;
}

export interface DateField {
  iso8601?: string;
  jira?: string;
  friendly?: string;
  epochMillis?: number;
}

export interface User {
  accountId: string;
  displayName: string;
  emailAddress?: string;
  active?: boolean;
}

export interface ServiceRequest {
  issueId: string;
  issueKey: string;
  requestTypeId?: string;
  serviceDeskId?: string;
  summary?: string;
  description?: string;
  status?: { status: string; statusDate?: DateField };
  currentStatus?: { status: string; statusDate?: DateField };
  requestedBy?: User;
  reporter?: User;
  createdDate?: DateField;
  _links?: Record<string, unknown>;
  _expands?: string[];
}

export interface Comment {
  id: string;
  author?: User;
  body?: string;
  renderedBody?: { html?: string };
  created?: DateField;
  public?: boolean;
  _links?: Record<string, unknown>;
}

export interface Approval {
  id: string;
  name: string;
  finalDecision: string;
  canAnswerApproval: boolean;
  approvers?: {
    approver: User;
    approverDecision: string;
  }[];
  createdDate?: DateField;
  completionDate?: DateField;
  _links?: Record<string, unknown>;
}

export interface SlaInformation {
  id: string;
  name: string;
  missedCount?: number;
  completedCycles?: {
    startTime?: DateField;
    stopTime?: DateField;
    breachTime?: DateField;
    breached?: boolean;
    goalDuration?: { millis?: number; friendly?: string };
    elapsedTime?: { millis?: number; friendly?: string };
    remainingTime?: { millis?: number; friendly?: string };
  }[];
  ongoingCycle?: {
    startTime?: DateField;
    breachTime?: DateField;
    paused?: boolean;
    withinCalendarHours?: boolean;
    goalDuration?: { millis?: number; friendly?: string };
    elapsedTime?: { millis?: number; friendly?: string };
    remainingTime?: { millis?: number; friendly?: string };
  };
}

export interface Transition {
  id: string;
  name: string;
}

export interface Organization {
  id: string;
  name: string;
  _links?: Record<string, unknown>;
}

export interface Queue {
  id: string;
  name: string;
  issueCount: number;
  fields?: string[];
  _links?: Record<string, unknown>;
}

export interface Issue {
  id: string;
  key: string;
  fields?: Record<string, unknown>;
}

export interface AccessibleResource {
  id: string;
  name: string;
  url: string;
  scopes?: string[];
  avatarUrl?: string;
}






export interface OpsPagedResponse<T> {
  values: T[];
  links?: { next?: string; prev?: string };
  count?: number;
}




export interface AssetsPagedResponse<T> {
  values: T[];
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
}

export interface AssetSchema {
  id: string;
  name: string;
  objectSchemaKey?: string;
}

export interface AssetObjectType {
  id: number | string;
  name: string;
}

export interface OpsScheduleSummary {
  id: string;
  name: string;
  enabled?: boolean;
}

export interface OpsAlertSummary {
  id: string;
  tinyId?: string;
  alias?: string;
  message: string;
  status: string;
  createdAt?: number; 
}



export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string; 
}
