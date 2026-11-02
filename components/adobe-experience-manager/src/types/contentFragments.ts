export type ContentFragmentStatus =
  | "NEW"
  | "DRAFT"
  | "PUBLISHED"
  | "MODIFIED"
  | "UNPUBLISHED";

export type ContentFragmentSortField =
  | "title"
  | "created"
  | "modified"
  | "modifiedOrCreated";

interface AemAuditStamp {
  at?: string;
  by?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

interface AemTag {
  id: string;
  title?: string;
  titlePath?: string;
  name?: string;
  path?: string;
  description?: string;
}

interface TimeIntervalCriteria {
  after?: string;
  before?: string;
}

interface ContentFragmentModelRef {
  id: string;
  path: string;
  name: string;
  title?: string;
}

export interface ContentFragment {
  id: string;
  path: string;
  title: string;
  status: ContentFragmentStatus;
  created: AemAuditStamp;
  model: ContentFragmentModelRef;
  description?: string;
  modified?: AemAuditStamp;
  published?: AemAuditStamp;
  tags?: AemTag[];
  [key: string]: unknown;
}

export interface ContentFragmentModel {
  id: string;
  path: string;
  name: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ContentFragmentVariation {
  title: string;
  name?: string;
  description?: string;
  fields?: unknown[];
  tags?: unknown[];
  modified?: AemAuditStamp;
  [key: string]: unknown;
}

export interface ContentFragmentSearchFilter {
  path?: string;
  onlyDirectChildren?: boolean;
  status?: ContentFragmentStatus[];
  tags?: string[];
  modelIds?: string[];
  locale?: string[];
  modified?: TimeIntervalCriteria;
  modifiedOrCreated?: TimeIntervalCriteria;
  published?: TimeIntervalCriteria;
  fullText?: { text: string };
}

export interface ContentFragmentSearchQuery {
  filter?: ContentFragmentSearchFilter;
  sort?: { on: ContentFragmentSortField; order: "ASC" | "DESC" }[];
}
