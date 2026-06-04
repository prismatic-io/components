import type { AssetResponse } from "./shared";

export default interface ListRelatedAssetsResponse {
  asset: {
    id: string;
    externalId: string;
    relatedAssets: {
      total: number;
      hasNextPage: boolean;
      page: number;
      limit: number;
      items: AssetResponse[];
    };
  };
}
