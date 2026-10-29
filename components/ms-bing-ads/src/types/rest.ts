export interface BatchError {
  Code: number;
  Details?: string;
  ErrorCode?: string;
  FieldPath?: string;
  Index?: number;
  Message?: string;
  Type?: string;
}

export interface AddRestResponse {
  PartialErrors?: BatchError[];
  [key: string]: unknown;
}

export interface MutateRestResponse {
  PartialErrors?: BatchError[];
}

export interface QueryRestResponse {
  PartialErrors?: BatchError[];
  [key: string]: unknown;
}

export interface Campaign {
  Id?: number;
  Name?: string;
  CampaignType?: string;
  BudgetType?: string;
  DailyBudget?: number;
  BudgetId?: number;
  Status?: string;
  TimeZone?: string;
  [key: string]: unknown;
}

export interface AdGroup {
  Id?: number;
  Name?: string;
  Status?: string;
  [key: string]: unknown;
}

export interface Ad {
  Id?: number;
  Type?: string;
  Status?: string;
  [key: string]: unknown;
}

export interface Keyword {
  Id?: number;
  Text?: string;
  MatchType?: string;
  Status?: string;
  [key: string]: unknown;
}

export interface Budget {
  Id?: number;
  Name?: string;
  Amount?: number;
  BudgetType?: string;
  [key: string]: unknown;
}

export interface Audience {
  Id?: number;
  Name?: string;
  Type?: string;
  [key: string]: unknown;
}
