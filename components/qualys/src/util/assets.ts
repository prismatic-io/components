import { util } from "@prismatic-io/spectral";
import { gatewayRequest } from "../client";
import {
  DEFAULT_GATEWAY_PAGE_SIZE,
  HTTP_RANGE_NOT_SATISFIABLE,
  MIN_PAGE_SIZE,
} from "../constants";
import type {
  ChangedAssetsChangesObject,
  ChangedAssetsVisibility,
  FetchGatewayAssetsOptions,
  GatewayAssetResponse,
  HttpErrorResponse,
  QualysAsset,
} from "../types";
export const fetchGatewayAssets = async ({
  connection,
  debug,
  pageSize,
  fetchAll,
  extraParams = {},
}: FetchGatewayAssetsOptions): Promise<{
  assets: QualysAsset[];
  lastResponse: GatewayAssetResponse;
}> => {
  const effectivePageSize = fetchAll
    ? DEFAULT_GATEWAY_PAGE_SIZE
    : pageSize || DEFAULT_GATEWAY_PAGE_SIZE;
  const allAssets: QualysAsset[] = [];
  let lastId: string | undefined;
  let hasMore = true;
  let currentPageSize = effectivePageSize;
  let lastResponse!: GatewayAssetResponse;
  while (hasMore) {
    const params: Record<string, string | number> = {
      pageSize: currentPageSize,
      ...extraParams,
    };
    if (lastId) params.lastSeenAssetId = lastId;
    try {
      const response = await gatewayRequest(connection, debug, (client) =>
        client.post<GatewayAssetResponse>(
          "/rest/2.0/search/am/asset",
          undefined,
          {
            params,
          },
        ),
      );
      lastResponse = response.data;
      const assets = lastResponse.assetListData?.asset || [];
      allAssets.push(...assets);
      if (!fetchAll || lastResponse.hasMore !== 1) {
        hasMore = false;
      } else {
        lastId = util.types.toString(lastResponse.lastSeenAssetId);
        currentPageSize = effectivePageSize;
      }
    } catch (error: unknown) {
      const status = (error as HttpErrorResponse).response?.status;
      if (
        status === HTTP_RANGE_NOT_SATISFIABLE &&
        currentPageSize > MIN_PAGE_SIZE
      ) {
        currentPageSize = Math.max(
          Math.floor(currentPageSize / 2),
          MIN_PAGE_SIZE,
        );
        continue;
      }
      throw error;
    }
  }
  return { assets: allAssets, lastResponse };
};
export const toQualysAssetTimestamp = (lastPolledAt: string): string =>
  `${lastPolledAt.slice(0, 16)}Z`;
export const splitAssetsByChangeType = (
  assets: QualysAsset[],
  assetLastUpdated: string,
  { showNewRecords, showUpdatedRecords }: ChangedAssetsVisibility,
): ChangedAssetsChangesObject => {
  const watermark = new Date(assetLastUpdated).getTime();
  const createdRecords: QualysAsset[] = [];
  const updatedRecords: QualysAsset[] = [];
  for (const asset of assets) {
    const createdAt = asset.createdDate
      ? new Date(asset.createdDate).getTime()
      : Number.NaN;
    const isNew = !Number.isNaN(createdAt) && createdAt >= watermark;
    if (isNew) {
      if (showNewRecords) createdRecords.push(asset);
    } else if (showUpdatedRecords) {
      updatedRecords.push(asset);
    }
  }
  return { createdRecords, updatedRecords };
};
export const resolveChangedAssetItems = (
  data: ChangedAssetsChangesObject | undefined,
): QualysAsset[] => [
  ...(data?.createdRecords ?? []),
  ...(data?.updatedRecords ?? []),
];
