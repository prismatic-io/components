import { input } from "@prismatic-io/spectral";
import { toParentRefs } from "../util/clean";
import { connection, driveId, listId, siteId } from "./common";

const siteIds = input({
  label: "Site IDs",
  type: "string",
  required: true,
  placeholder: "Enter one or more site IDs",
  comments:
    "The SharePoint sites whose drives populate the list. Accepts a single site ID, a list of site IDs, or a selection of sites.",
  example:
    "contoso.sharepoint.com,2c712604-1370-44e7-a1f5-426573fda80a,2d2244c3-251a-49ea-93a8-39e1c3a060fe",
  clean: toParentRefs,
});

const driveIds = input({
  label: "Drive IDs",
  type: "string",
  required: true,
  placeholder: "Enter one or more drive IDs",
  comments:
    "The SharePoint drives whose top-level folders populate the list. Accepts a single drive ID, a list of drive IDs, or a selection of drives.",
  example: "b!WumF-zsD8ku93Y0QqhKM9jVTjPefo6RGrpVCkPpe547Qrf38sox_TYIFuj9sqJhv",
  clean: toParentRefs,
});

export const listDrivesInputs = {
  connection,
  siteId: { ...siteId, dataSource: undefined },
};

export const listFoldersInputs = {
  connection,
  driveId: { ...driveId, dataSource: undefined },
};

export const listItemsInSiteListInputs = {
  connection,
  siteId: { ...siteId, dataSource: undefined },
  listId: { ...listId, dataSource: undefined },
};

export const listSitesInputs = {
  connection,
};

export const listSubscriptionsInputs = {
  connection,
};

export const selectDrivesFromSitesInputs = {
  connection,
  siteIds,
};

export const selectFoldersFromDrivesInputs = {
  connection,
  driveIds,
};

export const selectSiteListInputs = {
  connection,
  siteId: { ...siteId, dataSource: undefined },
};

export const selectSitesInputs = {
  connection,
};
