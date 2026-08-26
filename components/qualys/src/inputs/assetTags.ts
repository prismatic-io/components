import { input } from "@prismatic-io/spectral";
import { asStringArray } from "../util";
import { assetId } from "./assets";
import { connection } from "./common";
const tagsToAdd = input({
  label: "Tags to Add",
  type: "string",
  required: false,
  collection: "valuelist",
  comments:
    "Tag IDs to assign to the asset. Static tags only — Qualys rejects dynamic tags.",
  clean: asStringArray,
  dataSource: "selectTag",
});
const tagsToRemove = input({
  label: "Tags to Remove",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "100",
  comments: "Tag IDs to remove from the asset.",
  clean: asStringArray,
  dataSource: "selectTag",
});
export const updateAssetTagsInputs = {
  connection,
  assetId,
  tagsToAdd,
  tagsToRemove,
};
