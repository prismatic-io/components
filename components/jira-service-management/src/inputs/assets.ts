import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber } from "../util";
import {
  additionalFields,
  additionalQueryParams,
  connection,
  fetchAll,
} from "./common";

const assetObjectId = input({
  label: "Object ID",
  type: "string",
  required: true,
  comments:
    "Numeric ID of the Assets object (e.g. 425). Distinct from the human-readable object key (e.g. ITAM-425).",
  placeholder: "Enter object ID",
  example: "425",
  clean: util.types.toString,
});

const assetObjectTypeId = input({
  label: "Object Type ID",
  type: "string",
  required: true,
  comments:
    "ID of the object type. Use the Select Object Type data source after picking a schema.",
  placeholder: "Enter object type ID",
  example: "23",
  dataSource: "selectAssetObjectType",
  clean: util.types.toString,
});

const assetSchemaId = input({
  label: "Schema ID",
  type: "string",
  required: true,
  comments:
    "ID of the Assets object schema. Use the Select Schema data source or List Schemas action.",
  placeholder: "Enter schema ID",
  example: "1",
  dataSource: "selectAssetSchema",
  clean: util.types.toString,
});

const assetAttributes = input({
  label: "Attributes",
  type: "code",
  language: "json",
  required: true,
  comments:
    "JSON array of attribute payloads for this object. Each item has the shape `{ objectTypeAttributeId, objectAttributeValues: [{ value }] }`.",
  placeholder: "Enter attributes as JSON array",
  example: JSON.stringify(
    [
      {
        objectTypeAttributeId: 135,
        objectAttributeValues: [{ value: "web-prod-01" }],
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const assetQL = input({
  label: "AQL Query",
  type: "string",
  required: true,
  comments:
    'Asset Query Language expression used to filter objects (e.g. `objectType = "Computer" AND Name LIKE "web-*"`).',
  placeholder: "Enter AQL query",
  example: 'objectType = "Computer"',
  clean: util.types.toString,
});

const assetIncludeAttributes = input({
  label: "Include Attributes",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, full attribute values are returned for each object. Disable to reduce payload size.",
  clean: util.types.toBool,
});

const assetStartAt = input({
  label: "Start At",
  type: "string",
  required: false,
  default: "0",
  comments: "Index of the first result to return.",
  placeholder: "Enter startAt",
  example: "0",
  clean: toOptionalNumber,
});

const assetMaxResults = input({
  label: "Max Results",
  type: "string",
  required: false,
  default: "50",
  comments: "Maximum number of results per page.",
  placeholder: "Enter maxResults",
  example: "50",
  clean: toOptionalNumber,
});

export const getAssetObjectInputs = {
  connection,
  assetObjectId,
};

export const createAssetObjectInputs = {
  connection,
  assetSchemaId,
  assetObjectTypeId,
  assetAttributes,
  additionalFields,
};

export const updateAssetObjectInputs = {
  connection,
  assetObjectId,
  assetObjectTypeId,
  assetAttributes,
  additionalFields,
};

export const deleteAssetObjectInputs = {
  connection,
  assetObjectId,
};

export const searchAssetObjectsInputs = {
  connection,
  assetQL,
  assetIncludeAttributes,
  assetStartAt,
  assetMaxResults,
};

export const listAssetSchemasInputs = {
  connection,
  fetchAll,
  assetStartAt,
  assetMaxResults,
  additionalQueryParams,
};

export const getAssetSchemaInputs = {
  connection,
  assetSchemaId,
};

export const listSchemaObjectTypesInputs = {
  connection,
  assetSchemaId,
  additionalQueryParams,
};
