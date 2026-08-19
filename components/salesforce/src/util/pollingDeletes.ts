import type { Connection } from "jsforce";
import { SF_DELETED_WINDOW_DAYS } from "../constants";
import type { DeletedRecord, PollingLogger } from "../types";
const WINDOW_MS = SF_DELETED_WINDOW_DAYS * 24 * 60 * 60 * 1000;
export const fetchDeletedRecords = async (
  client: Connection,
  recordType: string,
  since: string,
  now: string,
  logger: PollingLogger,
): Promise<{
  deletedRecords: DeletedRecord[];
  coveredUntil: string;
}> => {
  const earliest = new Date(new Date(now).getTime() - WINDOW_MS);
  const requested = new Date(since);
  const start = requested < earliest ? earliest : requested;
  if (requested < earliest) {
    logger.warn(
      `Deleted-record lookback for ${recordType} was clamped: Salesforce serves no more than ${SF_DELETED_WINDOW_DAYS} days of deletions. Deletions before ${earliest.toISOString()} cannot be retrieved.`,
    );
  }
  const result = await client
    .sobject(recordType)
    .deleted(start.toISOString(), new Date(now).toISOString());
  if (
    result.earliestDateAvailable &&
    new Date(result.earliestDateAvailable) > start
  ) {
    logger.warn(
      `Deletions for ${recordType} before ${result.earliestDateAvailable} are no longer available from Salesforce and cannot be retrieved. Records deleted in that period will not appear.`,
    );
  }
  return {
    deletedRecords: (result.deletedRecords || []).map((record) => ({
      id: record.id,
      deletedDate: record.deletedDate,
      IsDeleted: true as const,
    })),
    coveredUntil: result.latestDateCovered || start.toISOString(),
  };
};
