export interface SFError {
  message: string;
  errorCode: string;
  statusCode: number;
  data: Record<string, unknown>[];
}

export interface CleanSObject {
  type: string;
  Id: string;
  [key: string]: unknown;
}

export type NestedRecord = Record<string, Record<string, unknown>>;

export type SupplementalData = { data: NestedRecord; contentType: string } | undefined;
