import type { StripeChangesObject, StripeRecordChange } from "../types";

export const resolvePollingRecordChanges = (
  data: StripeChangesObject | undefined,
): StripeRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): StripeRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): StripeRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
