import type { Connection } from "jsforce";
import {
  LONG_TEXT_CLAMP_THRESHOLD,
  REQUIRED_POLL_FIELDS,
  SHORT_TEXT_AREA_MAX_LENGTH,
} from "../constants";
import type { PollingFieldLogger } from "../types";
export const resolvePollingFields = async (
  client: Connection,
  recordType: string,
  selectedFields: string[],
  returnIdsOnly: boolean,
  logger: PollingFieldLogger,
): Promise<string[]> => {
  if (returnIdsOnly) {
    return [...REQUIRED_POLL_FIELDS];
  }
  if (selectedFields.length > 0) {
    return [...new Set([...REQUIRED_POLL_FIELDS, ...selectedFields])];
  }
  const described = await client.describe(recordType);
  const allFields = described.fields.map((field) => field.name);
  const longTextCount = described.fields.filter(
    (field) =>
      (field.type === "textarea" &&
        (field.length ?? 0) > SHORT_TEXT_AREA_MAX_LENGTH) ||
      field.type === "base64",
  ).length;
  if (longTextCount >= LONG_TEXT_CLAMP_THRESHOLD) {
    logger.warn(
      `Record type ${recordType} has ${longTextCount} long-text fields and no Selected Fields set. Salesforce clamps this query to 200 records per page, requiring more API traffic.`,
    );
  }
  logger.debug(`Selecting ${allFields.length} fields for ${recordType}.`);
  return [...new Set([...REQUIRED_POLL_FIELDS, ...allFields])];
};
