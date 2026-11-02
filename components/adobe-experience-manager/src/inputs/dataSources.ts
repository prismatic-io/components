import { assetId } from "./assets";
import { connection } from "./common";
import { fragmentPath } from "./contentFragments";
import { sitemapUrl } from "./pages";

export const selectContentFragmentModelInputs = { connection };

export const selectFolderInputs = { connection };

export const selectContentFragmentInputs = {
  connection,
  path: { ...fragmentPath, dataSource: undefined },
};

export const selectFolderPathInputs = { connection };

export const selectAssetInputs = { connection };

export const selectAssetRenditionInputs = {
  connection,
  assetId: { ...assetId, dataSource: undefined },
};

export const selectSitemapPageInputs = { connection, sitemapUrl };
