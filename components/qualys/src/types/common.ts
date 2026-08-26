import type { QualysAsset } from "./assets";
export interface GatewayAssetResponse {
  responseMessage: string;
  responseCode: string;
  count: number;
  hasMore: number;
  lastSeenAssetId?: number;
  assetListData?: {
    asset: QualysAsset[];
  };
}
export interface QpsServiceResponseBody<T> {
  responseCode: string;
  count?: number;
  hasMoreRecords?: boolean;
  lastId?: number;
  data?: T[];
}
export interface QpsServiceResponse<T> {
  ServiceResponse: QpsServiceResponseBody<T>;
}
export interface ExamplePayload {
  data: unknown;
}
export interface FilterCriteria {
  field: string;
  operator: string;
  value: string;
}
export interface HttpErrorResponse {
  response?: {
    status?: number;
    headers?: Record<string, string>;
  };
}
