import { input, util } from "@prismatic-io/spectral";
import {
  BULK_ACTION_ITEMS_DEFAULT,
  BULK_ACTION_UNPUBLISH_ITEMS_DEFAULT,
} from "../constants";
import { cleanCodeInput } from "../util";
import { connection, environmentId, spaceId } from "./common";



const bulkActionId = input({
  label: "Bulk Action ID",
  type: "string",
  comments: "The unique identifier for the bulk action.",
  example: "5KsDBWseXY6QegucYAoacS",
  placeholder: "Enter bulk action ID",
  required: true,
  clean: util.types.toString,
});

const bulkActionItems = input({
  label: "Items",
  type: "code",
  language: "json",
  comments:
    "The items to be processed in the bulk action as a JSON object containing entities and actions.",
  placeholder: "Enter bulk action items JSON",
  default: JSON.stringify(BULK_ACTION_ITEMS_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const bulkActionUnpublishItems = input({
  label: "Items",
  type: "code",
  language: "json",
  comments:
    "The items to be unpublished in the bulk action as a JSON object containing entities to unpublish.",
  placeholder: "Enter unpublish items JSON",
  default: JSON.stringify(BULK_ACTION_UNPUBLISH_ITEMS_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});



export const getBulkActionInputs = {
  connection,
  spaceId,
  environmentId,
  bulkActionId,
};



export const publishBulkActionInputs = {
  connection,
  spaceId,
  environmentId,
  items: bulkActionItems,
};



export const unpublishBulkActionInputs = {
  connection,
  spaceId,
  environmentId,
  items: bulkActionUnpublishItems,
};
