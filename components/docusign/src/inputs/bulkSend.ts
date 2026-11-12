import { input, util } from "@prismatic-io/spectral";
import { bulkSendListJson } from "../json/bulkSendListJson";
import { connection, jsonInput } from "./common";

const bulkSendListId = input({
  label: "Bulk Send List ID",
  type: "string",
  comments:
    "The GUID of the bulk send list, returned when the list is created.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Bulk Send List ID",
  required: true,
  clean: util.types.toString,
});

const bulkSendBatchId = input({
  label: "Bulk Send Batch ID",
  type: "string",
  comments:
    "The unique identifier for the bulk send batch, returned when a bulk send request is submitted.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Bulk Send Batch ID",
  required: true,
  clean: util.types.toString,
});

export const createBulkSendListInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    default: JSON.stringify(bulkSendListJson, null, 2),
    comments:
      "For extra fields, see the [Create Bulk Send List API reference](https://developers.docusign.com/docs/esign-rest-api/reference/bulkenvelopes/bulksend/createbulksendlist/).",
  },
};

export const deleteBulkSendListInputs = {
  connection,
  bulkSendListId,
};

export const getBulkSendBatchStatusInputs = {
  connection,
  bulkSendBatchId,
};

export const getBulkSendBatchesInputs = {
  connection,
};

export const getBulkSendListInputs = {
  connection,
  bulkSendListId,
};

export const getBulkSendListsInputs = {
  connection,
};

export const updateBulkSendListInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    default: JSON.stringify(bulkSendListJson, null, 2),
    comments:
      "For extra fields, see the [Update Bulk Send List API reference](https://developers.docusign.com/docs/esign-rest-api/reference/bulkenvelopes/bulksend/updatebulksendlist/).",
  },
  bulkSendListId,
};
