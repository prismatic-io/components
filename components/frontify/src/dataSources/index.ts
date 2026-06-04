import { brandDataSource } from "./brands";
import { libraryAssetDataSource } from "./libaryAssets";
import { libraryDataSource } from "./library";
import { selectLibraryCollection } from "./libraryCollections";
import { selectLibraryFolder } from "./libraryFolders";
import { selectRelatedAsset } from "./relatedAssets";
import { selectWebhook } from "./webhooks";
import { workspaceProjectDatasource } from "./workspaceProject";
import { workspaceProjectAssetDataSource } from "./workspaceProjectAssets";
import { selectWorkspaceProjectFolder } from "./workspaceProjectFolders";

export default {
  brandDataSource,
  libraryDataSource,
  libraryAssetDataSource,
  workspaceProjectDatasource,
  workspaceProjectAssetDataSource,
  selectWorkspaceProjectFolder,
  selectWebhook,
  selectRelatedAsset,
  selectLibraryFolder,
  selectLibraryCollection,
};
