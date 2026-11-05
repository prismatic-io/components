import { ASSET_ANCESTORS_FIELD, ASSET_FORMAT_FIELD } from "../constants";
import type { AssetSearchClause, AssetSearchFilters } from "../types";

export const buildAssetFilterClauses = ({
  folderIds,
  mimeTypes,
}: AssetSearchFilters): AssetSearchClause[] => [
  ...(folderIds.length ? [{ term: { [ASSET_ANCESTORS_FIELD]: folderIds } }] : []),
  ...(mimeTypes.length ? [{ term: { [ASSET_FORMAT_FIELD]: mimeTypes } }] : []),
];
