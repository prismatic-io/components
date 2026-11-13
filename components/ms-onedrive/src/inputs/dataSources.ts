import { input } from "@prismatic-io/spectral";
import { toParentRefs } from "../util/clean";
import { oneDriveConnection } from "./common";
import { driveId } from "./drives";
import { dir } from "./files";

const siteIds = input({
  label: "Site IDs",
  type: "string",
  required: true,
  example:
    "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bae9019,712a596e-90a1-49e3-9b48-bfa80bee8740",
  placeholder: "Enter one or more site IDs",
  comments:
    "The SharePoint sites whose drives populate the list. Accepts a single site ID, a list of site IDs, or a selection of sites.",
  clean: toParentRefs,
});

const driveIds = input({
  label: "Drive IDs",
  type: "string",
  required: true,
  example: "b!t18F8ybsHUq1z3LTz8xvZqP8zaSWjkFNhsME-Fepo75dTf9vQKfeRblBZjoSQrd7",
  placeholder: "Enter one or more drive IDs",
  comments:
    "The drives whose top-level folders populate the list. Accepts a single drive ID, a list of drive IDs, or a selection of drives.",
  clean: toParentRefs,
});

export const listDrivesDataSourceInputs = {
  oneDriveConnection,
};

export const listFilesInDirectoryInputs = {
  connection: oneDriveConnection,
  dir,
};

export const listFoldersInputs = {
  oneDriveConnection,
  dir,
};

export const listGroupsDataSourceInputs = {
  connection: oneDriveConnection,
};

export const listUsersInputs = {
  connection: oneDriveConnection,
};

export const selectDriveItemInputs = {
  connection: oneDriveConnection,
  driveId: { ...driveId, dataSource: undefined },
};

export const selectDrivesFromSitesInputs = {
  connection: oneDriveConnection,
  siteIds,
};

export const selectFoldersFromDrivesInputs = {
  connection: oneDriveConnection,
  driveIds,
};

export const selectSiteInputs = {
  connection: oneDriveConnection,
};

export const selectSitesInputs = {
  connection: oneDriveConnection,
};

export const selectSubscriptionInputs = {
  connection: oneDriveConnection,
};
