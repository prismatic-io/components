import { input } from "@prismatic-io/spectral";
import { toTrimmedString } from "../util/clean";
import { fetchAll, oneDriveConnection, pagination } from "./common";

export const siteId = input({
  label: "Site ID",
  type: "string",
  required: true,
  example:
    "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bae9019,712a596e-90a1-49e3-9b48-bfa80bee8740",
  placeholder: "Enter site ID",
  comments: "The unique identifier of the SharePoint site.",
  dataSource: "selectSite",
  clean: toTrimmedString,
});

export const getSiteInputs = {
  connection: oneDriveConnection,
  siteId,
};

export const listSitesInputs = {
  connection: oneDriveConnection,
  fetchAll,
  pagination,
};
