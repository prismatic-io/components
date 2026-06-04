import type { PollingChangesResult } from "../types/PollingState";
import type { PollingTriggerObject } from "../types/PollingTriggerObject";










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
