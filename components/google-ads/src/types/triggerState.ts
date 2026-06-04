import type { BUDGET_SEVERITY } from "../constants";
import type { CampaignQueryRow } from "./CampaignQueryRow";

export interface PollingState {
  lastSyncDate: string;
  lastChangeTime?: string;
  campaigns: CampaignQueryRow[];
  budgetAlerts?: Record<string, unknown>[];
  errorCount: number;
  consecutiveErrors?: number;
  changeCount?: number;
}

export interface CampaignChange {
  changeType: string;
  campaignId: string;
  campaignName: string;
  field: string;
  oldValue: CampaignQueryRow | string | null | undefined;
  newValue: CampaignQueryRow | string | null | undefined;
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
