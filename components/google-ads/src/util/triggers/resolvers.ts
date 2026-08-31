import { OPERATION_TO_CHANGE_TYPE } from "../../constants";
import type {
  BudgetAlertBatchItem,
  BudgetAlertChangesObject,
  CampaignChangeBatchItem,
  CampaignChangesObject,
  ChangeHistoryBatchItem,
  ChangeHistoryChangesObject,
} from "../../types";
export const resolveCampaignChanges = (
  data: CampaignChangesObject | undefined,
): CampaignChangeBatchItem[] => {
  const changesObject = data ?? {
    changes: [],
    changesDetected: 0,
    timeRange: { start: "", end: "" },
    syncedAt: "",
  };
  return (changesObject.changes ?? []).map(
    (record): CampaignChangeBatchItem => ({
      changeType: record.changeType,
      record,
    }),
  );
};
export const resolveChangeHistoryItems = (
  data: ChangeHistoryChangesObject | undefined,
): ChangeHistoryBatchItem[] => {
  const changesObject = data ?? {
    changes: [],
    changeCount: 0,
    timeRange: { start: "", end: "" },
  };
  return (changesObject.changes ?? []).map(
    (record): ChangeHistoryBatchItem => ({
      changeType:
        OPERATION_TO_CHANGE_TYPE[record.changeEvent.resourceChangeOperation] ??
        "updated",
      record,
    }),
  );
};
export const resolveBudgetAlerts = (
  data: BudgetAlertChangesObject | undefined,
): BudgetAlertBatchItem[] => {
  const changesObject = data ?? {
    alerts: [],
    totalCampaignsMonitored: 0,
    alertThreshold: 0,
  };
  return (changesObject.alerts ?? []).map(
    (record): BudgetAlertBatchItem => ({
      changeType: record.severity,
      record,
    }),
  );
};
