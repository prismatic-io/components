import { RESOURCE_CONFIG } from "../constants";
import type { GorgiasRecord } from "../types";

export const pollResourceModel = Object.entries(RESOURCE_CONFIG).map(
  ([value, _config]) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  }),
);





export function filterByTimestamp(
  records: GorgiasRecord[],
  lastPolledAt: string,
  includeNew: boolean,
  includeUpdated: boolean,
): { created: GorgiasRecord[]; updated: GorgiasRecord[] } {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: GorgiasRecord[] = [];
  const updated: GorgiasRecord[] = [];

  for (const record of records) {
    const createdAtDate =
      typeof record.created_datetime === "string"
        ? new Date(record.created_datetime)
        : null;
    const updatedAtDate =
      typeof record.updated_datetime === "string"
        ? new Date(record.updated_datetime)
        : null;

    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    const isUpdated =
      !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;

    if (isNew && includeNew) created.push(record);
    else if (isUpdated && includeUpdated) updated.push(record);
  }

  return { created, updated };
}
