export type AemResourceType = "contentFragment" | "asset" | "page" | "unknown";

export type AemChangeType =
  | "created"
  | "modified"
  | "published"
  | "unpublished"
  | "deleted"
  | "initialSync";

export interface AemContentRecord {
  resourceType: AemResourceType;
  id: string;
  path: string | null;
  url: string | null;
  title: string | null;
  tags: { id: string; title: string | null; titlePath: string | null }[];
  created: string | null;
  modified: string | null;
  published: string | null;
  scope: string;
  data: unknown;
}

export interface AemChangeItem {
  changeType: AemChangeType;
  record: AemContentRecord;
}

export interface AemPollingChangesObject {
  items?: AemChangeItem[];
}
