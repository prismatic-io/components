import type {
  BuiltPollingQuery,
  NetSuitePollingState,
  PollingChangesResult,
  PollingQueryParams,
} from "../types/PollingState";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingTriggerObject,
} from "../types/PollingTriggerObject";
export const buildPollingQuery = (
  pollState: NetSuitePollingState | undefined,
  params: PollingQueryParams,
  now: string,
): BuiltPollingQuery => {
  const cursor = pollState?.lastPolledAt ?? "";
  const lookBackDate = params.lookBackDate ?? "";
  const filter =
    (params.additionalFilter ?? "") === ""
      ? ""
      : ` AND ${params.additionalFilter}`;
  if (cursor !== "") {
    return {
      query: `lastmodifieddate AFTER ${cursor}${filter}`,
      lastPolledAt: cursor,
      isInitialSync: false,
    };
  }
  if (lookBackDate !== "") {
    return {
      query: `lastmodifieddate ON_OR_AFTER ${lookBackDate}`,
      lastPolledAt: lookBackDate,
      isInitialSync: true,
    };
  }
  return {
    query: `lastmodifieddate AFTER ${now}${filter}`,
    lastPolledAt: now,
    isInitialSync: false,
  };
};
export const getPollingChanges = (
  showNewRecords: boolean,
  showUpdatedRecords: boolean,
  records: PollingTriggerObject[],
  lastPolledAtDate: Date,
): PollingChangesResult => {
  const changesObject: PollingChangesResult["changesObject"] = {};
  if (showNewRecords) {
    changesObject.createdRecords = [];
  }
  if (showUpdatedRecords) {
    changesObject.updatedRecords = [];
  }
  let changes = 0;
  for (const record of records) {
    const recordModifiedAt = new Date(record.lastmodifieddate);
    const recordCreatedAt = new Date(record.datecreated);
    const changeExists = recordModifiedAt > lastPolledAtDate;
    if (changeExists) {
      const isCreated = recordCreatedAt > lastPolledAtDate;
      if (isCreated && showNewRecords) {
        changes += 1;
        changesObject.createdRecords?.push(record);
      }
      const isUpdated = recordModifiedAt > recordCreatedAt && !isCreated;
      if (isUpdated && showUpdatedRecords) {
        changes += 1;
        changesObject.updatedRecords?.push(record);
      }
    }
  }
  return { changesObject, changes };
};
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.createdRecords ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updatedRecords ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
