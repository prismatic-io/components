import type {
  Engagement,
  PollingChangesObject,
  PollingRecordChange,
} from "../types";
export const resolvePollingRecordChanges = (
  data: Partial<PollingChangesObject> | undefined,
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
export const getEngagementObjectLabel = (
  properties: Engagement["properties"],
): string => {
  const engagementObjectProperties = [
    "hs_task_subject",
    "hs_postal_mail_body",
    "hs_note_body",
    "hs_meeting_title",
    "hs_call_body",
    "hs_call_title",
    "hs_email_subject",
    "hs_communication_body",
  ];
  for (const property of Object.keys(properties)) {
    if (engagementObjectProperties.includes(property)) {
      return properties[property];
    }
  }
  return `Engagement ${properties.hs_object_id}`;
};
