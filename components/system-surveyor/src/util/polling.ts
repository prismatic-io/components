export interface SiteRecordChange {
  changeType: "modified";
  record: unknown;
}

export const resolveSiteChanges = (
  data: unknown[] | undefined,
): SiteRecordChange[] =>
  (data ?? []).map(
    (record): SiteRecordChange => ({ changeType: "modified", record }),
  );
