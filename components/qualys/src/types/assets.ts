import type { Connection } from "@prismatic-io/spectral";
export interface FetchGatewayAssetsOptions {
  connection: Connection;
  debug: boolean;
  pageSize?: number;
  fetchAll: boolean;
  extraParams?: Record<string, string | number>;
}
export interface QualysAsset {
  assetId: number;
  assetUUID?: string;
  hostId?: number;
  assetName?: string;
  address?: string;
  fqdn?: string;
  dnsName?: string;
  assetType?: string;
  operatingSystem?: {
    osName?: string;
    fullName?: string;
    category?: string;
  };
  lastModifiedDate?: string;
  createdDate?: string;
  tags?: unknown;
  sourceInfo?: unknown;
  networkInterface?: unknown;
  openPort?: unknown;
  businessInformation?: unknown;
  criticality?: unknown;
  sensor?: unknown;
}
export interface SyncAssetsResponse {
  message: string;
  responseCode: string;
  assetsError: Record<string, unknown>;
}
