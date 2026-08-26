import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { asStringArray, toOptionalString } from "../util";
import { connection, cursor, fetchAll, pageSize } from "./common";
export const assetId = input({
  label: "Asset ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the asset in Qualys.",
  clean: util.types.toString,
  placeholder: "Enter asset ID",
  example: "12345",
});
const lastModified = input({
  label: "Last Modified Since",
  type: "string",
  required: false,
  comments:
    "Filter assets modified after this date/time (ISO 8601). Used as an incremental sync watermark.",
  clean: toOptionalString,
  placeholder: "2024-01-01T00:00:00Z",
  example: "2024-01-01T00:00:00Z",
});
const includeFields = input({
  label: "Include Fields",
  type: "string",
  required: false,
  collection: "valuelist",
  comments:
    "Fields to include in the response. When set, only these fields are returned.",
  clean: asStringArray,
});
const excludeFields = input({
  label: "Exclude Fields",
  type: "string",
  required: false,
  collection: "valuelist",
  comments:
    "Field names to omit from the response payload, reducing response size.",
  clean: asStringArray,
});
const connectorUuid = input({
  label: "Connector UUID",
  type: "string",
  required: true,
  comments: "The connector UUID from the Qualys Connectors UI.",
  clean: util.types.toString,
  placeholder: "489e8429-2e82-4599-a2a8-xxxxxxxxxxxx",
  example: "489e8429-2e82-4599-a2a8-xxxxxxxxxxxx",
});
const source = input({
  label: "Source",
  type: "string",
  required: true,
  comments: "The source identifier for the sync request.",
  clean: util.types.toString,
  placeholder: "WEBHOOK",
  example: "WEBHOOK",
});
const requestId = input({
  label: "Request ID",
  type: "string",
  required: false,
  comments: "An optional request identifier for tracking the sync operation.",
  clean: toOptionalString,
  placeholder: "6562e033-8456-4c13-989f-7f4f6fc67e3b",
  example: "6562e033-8456-4c13-989f-7f4f6fc67e3b",
});
const assetCount = input({
  label: "Asset Count",
  type: "string",
  required: false,
  comments: "An optional count of assets being synced.",
  clean: toOptionalString,
  placeholder: "10",
  example: "10",
});
const connectorMetaData = structuredObjectInput({
  label: "Connector Metadata",
  required: true,
  comments:
    "Connector identifier, source, request tracking, and asset count details.",
  inputs: {
    connectorUuid,
    source,
    requestId,
    assetCount,
  },
});
const assetData = input({
  label: "Asset Data",
  type: "code",
  language: "json",
  required: true,
  comments:
    "JSON array of asset objects to push to Qualys. Each object should contain identityAttributes (hostName, ipAddress, macAddress, serialNumber, etc.) and coreAttributes (address, biosInfo, softwares, networkInterfaces, etc.).",
  clean: util.types.toObject,
  example: JSON.stringify(
    [
      {
        identityAttributes: {
          hostName: "web-server-01",
          ipAddress: ["10.0.1.50"],
          sourceNativeKey: "asset-001",
        },
        coreAttributes: {
          hostName: "web-server-01",
          address: "10.0.1.50",
          operatingSystem: "Ubuntu 22.04",
          sourceLastUpdatedDate: 1700000000000,
          sourceCreatedDate: 1700000000000,
        },
      },
    ],
    null,
    2,
  ),
});
export const listAssetsInputs = {
  connection,
  fetchAll,
  pagination: structuredObjectInput({
    label: "Pagination",
    required: false,
    comments: "Page size and cursor controls for keyset pagination.",
    inputs: {
      pageSize,
      cursor,
    },
  }),
  lastModified,
  includeFields,
  excludeFields,
};
export const getAssetInputs = { connection, assetId };
export const syncAssetInputs = { connection, connectorMetaData, assetData };
