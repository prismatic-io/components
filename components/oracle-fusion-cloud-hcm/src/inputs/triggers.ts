import { input, util } from "@prismatic-io/spectral";
import { atomFeedModel, restResourceModel } from "../util";
import { connection } from "./common";
const feedName = input({
  label: "Feed Name",
  type: "string",
  required: true,
  model: atomFeedModel,
  comments:
    "The Oracle HCM Atom feed to subscribe to. Additional feeds can be discovered via the Interface Catalog URL on the Oracle HCM instance.",
  placeholder: "Select a feed",
  example: "NewHire",
  clean: util.types.toString,
});
const changesPageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  default: "100",
  comments:
    "The maximum number of Atom feed entries to process per trigger invocation. Oracle HCM caps this at 1000.",
  placeholder: "Enter page size",
  example: "100",
  clean: util.types.toNumber,
});
const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: restResourceModel,
  comments:
    "The Oracle HCM data resource to sync. Each trigger instance polls one resource type and emits all records updated since the last run.",
  placeholder: "Select a resource type",
  example: "Workers",
  clean: util.types.toString,
});
const recordsPageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  default: "100",
  comments:
    "The maximum number of records to fetch per API page. Multiple pages are fetched automatically until all updated records are retrieved. Oracle HCM caps this at 500.",
  placeholder: "Enter page size",
  example: "100",
  clean: util.types.toNumber,
});
export const pollChangesInputs = {
  connection,
  feedName,
  pageSize: changesPageSize,
};
export const pollRecordsInputs = {
  connection,
  resourceType,
  pageSize: recordsPageSize,
};
