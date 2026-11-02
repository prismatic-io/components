interface AssetSearchRange {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
}

export type AssetSearchClause =
  | { match: { text: string; mode?: string } }
  | { term: Record<string, string[]> }
  | { range: Record<string, AssetSearchRange> };

interface AssetRepositoryMetadata {
  "repo:name"?: string;
  "repo:path"?: string;
  "repo:assetId"?: string;
  "repo:createDate"?: string;
  "repo:modifyDate"?: string;
  "repo:ancestors"?: string[];
  "dc:format"?: string;
  "repo:size"?: number;
  "aem:published"?: string;
  [key: string]: unknown;
}

export interface AssetSearchFilters {
  folderIds: string[];
  mimeTypes: string[];
}

export interface AssetSearchHit {
  assetId: string;
  repositoryMetadata?: AssetRepositoryMetadata;
  assetMetadata?: Record<string, unknown>;
}

export interface DownloadedFile {
  data: Buffer;
  contentType: string;
}

export interface DeletedAsset {
  assetId: string;
  deleted: true;
}

export interface ImportJob {
  id: string;
  state: "PROCESSING" | "COMPLETED" | "FAILED";
  operation?: string;
  progress?: Record<string, unknown>;
  errors?: { type: string; title: string; detail?: string }[];
  [key: string]: unknown;
}

export interface MetadataPatchOperation {
  op: "add" | "remove";
  path: string;
  value?: string;
}

export interface AssetRenditionListResponse {
  items?: { name: string; [key: string]: unknown }[];
  [key: string]: unknown;
}

export interface AssetSearchRequest {
  query: AssetSearchClause[];
  sort?: { field: string; order: "ASC" | "DESC" }[];
  limit?: number;
  cursor?: string;
}

export interface AssetSearchResponse {
  hits?: { results?: AssetSearchHit[] };
  cursor?: string;
  search_metadata?: Record<string, unknown>;
}
