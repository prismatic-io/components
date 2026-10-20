import type { AssetResponse } from "./shared";
export default interface ListRelatedAssetsResponse {
  asset: {
    id: string;
    externalId: string | null;
    relatedAssets: {
      total: number;
      hasNextPage: boolean;
      page: number;
      limit: number;
      items: AssetResponse[];
    };
  };
}
