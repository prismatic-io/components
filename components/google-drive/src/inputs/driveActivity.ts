import { input } from "@prismatic-io/spectral";
import { cleanItemInput, cleanStringInput } from "../util";
import { connection, fetchAll, pageToken } from "./common";
export const itemName = input({
  label: "File ID",
  type: "string",
  required: false,
  comments: "Return activities for this Drive item.",
  example: "1a2b3c4d5e6f7g8h9i0j",
  placeholder: "Enter File ID",
  dataSource: "selectFiles",
  clean: cleanItemInput,
});
export const ancestorName = input({
  label: "Folder or Drive ID",
  type: "string",
  required: false,
  comments:
    "Return activities for this Drive or folder, plus all children and descendants.",
  example: "0ALiN8fRST0gxUk9PVA",
  placeholder: "Enter Folder or Drive ID",
  dataSource: "selectFolder",
  clean: cleanItemInput,
});
export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments: "The filtering for items returned from this query request.",
  example: "time > 1452409200000 AND time <= 1492812924310",
  placeholder: "Enter filter expression",
  clean: cleanStringInput,
});
export const consolidationStrategy = input({
  label: "Consolidation Strategy",
  type: "string",
  required: false,
  placeholder: "Select consolidation strategy",
  comments:
    "Details on how to consolidate related actions that make up the activity. If not set, then related actions aren't consolidated.",
  model: [
    { value: "none", label: "None" },
    { value: "legacy", label: "Legacy" },
  ],
  clean: cleanStringInput,
});
export const queryDriveActivityInputs = {
  connection,
  itemName,
  ancestorName,
  fetchAll,
  pageToken,
  filter,
  consolidationStrategy,
};
