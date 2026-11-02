import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { ASSET_SORT_FIELDS } from "../constants";
import {
  cleanHttpsUrl,
  cleanKeyValueRecord,
  cleanOptionalDateTime,
  cleanRequiredDamPath,
  cleanRequiredString,
  cleanString,
  cleanStringList,
} from "../utils/clean";
import { connection, fetchAll, pagination, sortOrder } from "./common";
import { jobId } from "./folders";

export const assetId = input({
  label: "Asset ID",
  placeholder: "Enter asset ID",
  type: "string",
  required: true,
  dataSource: "selectAsset",
  comments: "The ID of the asset, in urn:aaid:aem:... form.",
  example: "urn:aaid:aem:4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
  clean: cleanRequiredString,
});

const seoName = input({
  label: "File Name",
  placeholder: "Enter file name",
  type: "string",
  required: true,
  comments:
    "The file name to request the binary under, usually the asset's own name.",
  example: "city.jpeg",
  clean: cleanRequiredString,
});

const renditionName = input({
  label: "Rendition Name",
  placeholder: "Enter rendition name",
  type: "string",
  required: true,
  dataSource: "selectAssetRendition",
  comments: "The name of the rendition, as returned by List Asset Renditions.",
  example: "cq5dam.web.1280.1280.jpeg",
  clean: cleanRequiredString,
});

export const folderIds = input({
  label: "Folders",
  placeholder: "Select folder",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  dataSource: "selectFolder",
  comments: "Only include assets inside one of these folder IDs, at any depth.",
  example: "urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123456",
  clean: cleanStringList,
});

export const mimeTypes = input({
  label: "MIME Types",
  placeholder: "Enter MIME type",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  comments: "Only include assets with one of these exact MIME types.",
  example: "application/pdf",
  clean: cleanStringList,
});

const modifiedAfter = input({
  label: "Modified After",
  placeholder: "Enter date-time (ISO 8601)",
  type: "string",
  required: false,
  comments: "Only return assets modified at or after this ISO 8601 date-time.",
  example: "2026-01-01T00:00:00Z",
  clean: cleanOptionalDateTime,
});

const modifiedBefore = input({
  label: "Modified Before",
  placeholder: "Enter date-time (ISO 8601)",
  type: "string",
  required: false,
  comments: "Only return assets modified before this ISO 8601 date-time.",
  example: "2026-02-01T00:00:00Z",
  clean: cleanOptionalDateTime,
});

const searchText = input({
  label: "Search Text",
  placeholder: "Enter search text",
  type: "string",
  required: false,
  comments:
    "Full-text search across asset metadata. Leave empty to match every asset.",
  example: "city skyline",
  clean: cleanString,
});

const sortField = input({
  label: "Sort By",
  type: "string",
  required: false,
  model: ASSET_SORT_FIELDS,
  comments: "The field to sort results by. Leave empty to sort by relevance.",
  clean: cleanString,
});

const filters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: { searchText, sortField, sortOrder },
});

export const searchAssetsInputs = {
  connection,
  fetchAll,
  pagination,
  folderIds,
  mimeTypes,
  modifiedAfter,
  modifiedBefore,
  filters,
};

export const getAssetMetadataInputs = { connection, assetId };

export const listAssetRenditionsInputs = { connection, assetId };

export const downloadAssetInputs = { connection, assetId, seoName };

export const downloadAssetRenditionInputs = {
  connection,
  assetId,
  renditionName,
  seoName,
};

const destinationFolder = input({
  label: "Destination Folder Path",
  placeholder: "Enter folder path",
  type: "string",
  required: true,
  dataSource: "selectFolderPath",
  comments:
    "The path of the folder to import into, below /content/dam, such as wknd-shared/en. A full repository path starting with /content/dam is also accepted.",
  example: "wknd-shared/en",
  clean: cleanRequiredDamPath,
});

const fileUrl = input({
  label: "File URL",
  placeholder: "Enter file URL",
  type: "string",
  required: true,
  comments:
    "The https:// URL AEM downloads the file from. It must be reachable from AEM.",
  example: "https://cdn.example.com/city.jpeg",
  clean: cleanHttpsUrl,
});

const importMimeType = input({
  label: "MIME Type",
  placeholder: "Enter MIME type",
  type: "string",
  required: false,
  comments: "The file's MIME type. Leave empty to let AEM detect it.",
  example: "image/jpeg",
  clean: cleanString,
});

const metadataValues = input({
  label: "Metadata Values",
  placeholder: "Enter metadata field and value",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  default: [],
  comments:
    "Metadata fields to set, keyed by field name such as dc:title. Only asset metadata is writable; repository metadata is read-only.",
  example: "dc:title",
  clean: cleanKeyValueRecord,
});

const removeFields = input({
  label: "Fields to Remove",
  placeholder: "Enter field name",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  comments:
    "Metadata field names to remove from the asset, such as dc:description.",
  example: "dc:description",
  clean: cleanStringList,
});

const forceDelete = input({
  label: "Force",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, deletes the asset even when it is referenced elsewhere.",
  clean: util.types.toBool,
});

export const importAssetFromUrlInputs = {
  connection,
  folder: destinationFolder,
  fileUrl,
  fileName: { ...seoName, comments: "The name the asset is created with." },
  mimeType: importMimeType,
};

export const getImportJobStatusInputs = { connection, jobId };

export const updateAssetMetadataInputs = {
  connection,
  assetId,
  metadataValues,
  removeFields,
};

export const deleteAssetInputs = { connection, assetId, force: forceDelete };

export const getAssetJobStatusInputs = { connection, jobId };
