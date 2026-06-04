import type { DeletedRecord, PollingTriggerObject } from "../types";

export const getPollingChanges = (
  showNewRecords: boolean,
  showUpdatedRecords: boolean,
  searchRecords: PollingTriggerObject[],
  lastPolledAtDate: Date,
  deletedRecords: DeletedRecord[] = [],
) => {
  let changes = 0;
  const changesObject = searchRecords.reduce(
    (acc, record) => {
      const recordUpdatedAt = new Date(record.LastModifiedDate);
      const recordCreatedAt = new Date(record.CreatedDate);

      const changeExists = recordUpdatedAt > lastPolledAtDate || recordCreatedAt > lastPolledAtDate;

      if (changeExists) {
        const isCreated = recordCreatedAt > lastPolledAtDate;
        const isUpdated = recordUpdatedAt > recordCreatedAt;
        if (isCreated && showNewRecords) {
          changes += 1;
          acc.createdRecords.push(record);
        }
        if (isUpdated && showUpdatedRecords) {
          changes += 1;
          acc.updatedRecords.push(record);
        }
      }
      return acc;
    },
    {
      updatedRecords: [] as PollingTriggerObject[],
      createdRecords: [] as PollingTriggerObject[],
      deletedRecords,
    },
  );

  changes += deletedRecords.length;

  return {
    changesObject,
    changes,
  };
};
