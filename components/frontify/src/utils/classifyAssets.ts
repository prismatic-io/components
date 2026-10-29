import type { AssetResponse } from "../actions/types/shared";

export const classifyAssetsByPollDate = (
  assets: AssetResponse[],
  lastPolledAt: string,
): { created: AssetResponse[]; updated: AssetResponse[] } => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  const created: AssetResponse[] = [];
  const updated: AssetResponse[] = [];

  for (const asset of assets) {
    const createdMs = asset.createdAt
      ? new Date(asset.createdAt).getTime()
      : Number.NaN;
    const modifiedMs = asset.modifiedAt
      ? new Date(asset.modifiedAt).getTime()
      : Number.NaN;

    const isNew = !Number.isNaN(createdMs) && createdMs > lastPolledAtMs;
    const isUpdated =
      !isNew && !Number.isNaN(modifiedMs) && modifiedMs > lastPolledAtMs;

    if (isNew) {
      created.push(asset);
    } else if (isUpdated) {
      updated.push(asset);
    }
  }

  return { created, updated };
};
