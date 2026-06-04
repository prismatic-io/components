import { brandId, connection, libraryId, projectId } from "./sharedInputs";

export const brandsInputs = {
  connection,
};

export const libraryAssetsInputs = {
  connection,
  libraryId: { ...libraryId, dataSource: undefined },
};

export const libraryInputs = {
  connection,
  brandId: { ...brandId, dataSource: undefined },
};

export const workspaceProjectInputs = {
  connection,
  brandId: { ...brandId, dataSource: undefined },
};

export const workspaceProjectAssetInputs = {
  connection,
  projectId: { ...projectId, dataSource: undefined },
};
