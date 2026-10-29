import type { AdobeChangesObject, AdobeRecordChange } from "./types/triggers";

export const resolvePollingRecordChanges = (
  data: AdobeChangesObject | undefined,
): AdobeRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): AdobeRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): AdobeRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
