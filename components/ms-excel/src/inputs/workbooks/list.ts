import { input, util } from "@prismatic-io/spectral";
import {
  $expand,
  $orderBy,
  $select,
  $skipToken,
  $top,
  connection,
  driveOrSiteId,
  fetchAll,
} from "../general";
import { cleanString } from "../../helpers";

const listOrItemId = input({
  label: "List or Item ID",
  type: "string",
  comments:
    "The SharePoint list ID or OneDrive item ID used to scope the workbook search.",
  required: false,
  example: "01J363WTN6Y2GOVW7725BZO354PWSELRRZ",
  placeholder: "Enter list or item ID",
  clean: util.types.toString,
});

export const path = input({
  label: "Path",
  type: "string",
  comments:
    "The path to the file or folder within the drive. Use this or Drive or Site ID.",
  required: false,
  example: "/drive/root:/folder/file.xlsx",
  placeholder: "Enter file or folder path",
  clean: cleanString,
});

export const listWorkbooksInputs = {
  path,
  driveOrSiteId: {
    ...driveOrSiteId,
    comments: `${driveOrSiteId.comments} Use this or Path.`,
    required: false,
  },
  listOrItemId,
  fetchAll,
  $expand,
  $select,
  $skipToken,
  $top,
  $orderBy,
};

export const selectWorkbookInputs = {
  connection,
  driveOrSiteId: {
    ...listWorkbooksInputs.driveOrSiteId,
    dataSource: undefined,
  },
  listOrItemId,
  path,
};
