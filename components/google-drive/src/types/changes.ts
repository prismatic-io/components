export interface ListChangesResponse {
  kind?: string | null;
  newStartPageToken?: string | null;
  nextPageToken?: string | null;
  changes?: {
    kind?: string | null;
    removed?: boolean | null;
    file?: {
      kind?: string | null;
      mimeType?: string | null;
      id?: string | null;
      name?: string | null;
    };
    fileId?: string | null;
    time?: string | null;
    changeType?: "file" | "drive" | null;
  }[];
}
export interface ResolvedListChangesPageToken {
  value: string;
  isLegacy: boolean;
}
export type ListChange = NonNullable<ListChangesResponse["changes"]>[number];
export interface BackfillCursor extends Record<string, unknown> {
  modifiedAfter: string;
  startPageToken: string;
}
export interface ChangesPaginationState extends Record<string, unknown> {
  pageToken: string;
  backfill?: BackfillCursor;
}
export interface ChangesPollingState extends Record<string, unknown> {
  backfill?: BackfillCursor;
  backfillPageToken?: string;
}
