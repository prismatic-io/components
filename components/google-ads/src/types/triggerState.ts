import type { ActionLogger, Connection } from "@prismatic-io/spectral";
import type { BUDGET_SEVERITY } from "../constants";
import type { CampaignQueryRow } from "./CampaignQueryRow";
import type {
  CampaignResource,
  ChangeEventResponse,
} from "./ChangeEventResponse";
export interface BasePollingState {
  errorCount?: number;
  consecutiveErrors?: number;
  [key: string]: unknown;
}
export interface TriggerClientContext {
  debug: {
    enabled: boolean;
  };
  logger: ActionLogger;
}
export interface TriggerClientParams {
  connection: Connection;
  customerId: string;
  managerCustomerId?: string;
}
type CampaignChangeType =
  | "created"
  | "status"
  | "budget"
  | "bidding"
  | "deleted";
export interface CampaignChange {
  changeType: CampaignChangeType;
  campaignId: string;
  campaignName: string;
  field: string;
  oldValue: CampaignQueryRow | CampaignResource | string | null | undefined;
  newValue: CampaignQueryRow | CampaignResource | string | null | undefined;
  changedAt: string;
}
export interface BudgetStatus {
  campaignId: string;
  campaignName: string;
  budgetAmount: number;
  spent: number;
  percentSpent: number;
  remaining: number;
  period: string;
  shouldAlert: boolean;
  severity: BUDGET_SEVERITY;
  message: string;
}
export interface CampaignChangeBatchItem {
  changeType: CampaignChangeType;
  record: CampaignChange;
}
export interface ChangeHistoryBatchItem {
  changeType: "created" | "updated" | "removed";
  record: ChangeEventResponse;
}
export interface BudgetAlertBatchItem {
  changeType: BUDGET_SEVERITY;
  record: BudgetStatus;
}
export interface CampaignChangesObject {
  changes: CampaignChange[];
  changesDetected: number;
  timeRange: {
    start: string;
    end: string;
  };
  syncedAt: string;
}
export interface ChangeHistoryChangesObject {
  changes: ChangeEventResponse[];
  changeCount: number;
  timeRange: {
    start: string;
    end: string;
  };
}
export interface BudgetAlertChangesObject {
  alerts: BudgetStatus[];
  totalCampaignsMonitored: number;
  alertThreshold: number;
}
