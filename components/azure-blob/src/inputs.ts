import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "./utils";

export const containerName = input({
  label: "Container Name",
  placeholder: "Enter container name",
  type: "string",
  required: true,
  dataSource: "selectContainer",
  comments:
    "The Azure Blob Storage container name (3-63 characters, lowercase letters, numbers, and hyphens only). Containers organize blob storage similar to directories. [Learn more](https://learn.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata)",
  example: "my-azure-container",
  clean: util.types.toString,
});

export const prefix = input({
  label: "Prefix",
  placeholder: "Enter blob prefix (e.g., documents/)",
  type: "string",
  required: false,
  comments:
    "Filter blobs by prefix string. Use this to list blobs within a specific virtual directory. Include a trailing slash for directory-style filtering (e.g., 'documents/'). Leave blank to list all blobs.",
  example: "documents/invoices/",
  clean: toOptionalString,
});

export const blobName = input({
  label: "Blob Name",
  placeholder: "Enter blob name (file path)",
  type: "string",
  required: true,
  dataSource: "selectBlob",
  comments:
    "The blob name (file path) within the container. Do not include a leading slash. Use forward slashes for virtual directory structures.",
  example: "documents/report.pdf",
  clean: util.types.toString,
});

export const fileContents = input({
  label: "File Contents",
  placeholder: "Output data from previous step",
  type: "data",
  required: true,
  comments:
    "The contents to write to a blob. Accepts text strings or binary data (images, PDFs, etc.) from previous steps.",
  example: "My File Contents",
  clean: util.types.toData,
});

export const pageBlobSize = input({
  label: "Page Blob Size",
  placeholder: "Enter size in bytes (multiple of 512)",
  type: "string",
  required: true,
  comments:
    "The size to reserve for the page blob in bytes. Must be a multiple of 512 (e.g., 1024, 1536, 2048, 4096). Maximum size is 8 TiB (8,796,093,022,208 bytes).",
  example: "4096",
  clean: util.types.toString,
});

export const pageBlobOffset = input({
  label: "Page Blob Offset",
  placeholder: "Enter offset in bytes (multiple of 512)",
  type: "string",
  required: true,
  comments:
    "The starting byte position for writing to the page blob. Must be a multiple of 512 (e.g., 0, 512, 1024, 2048).",
  example: "0",
  clean: util.types.toString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Azure Blob Storage connection to use.",
});

export const sasStartsOnDate = input({
  label: "SAS Starts On",
  placeholder: "Enter start date (ISO 8601 format)",
  type: "string",
  required: true,
  comments:
    "The start date and time when the Shared Access Signature becomes valid. Must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).",
  example: "2026-01-27T00:00:00Z",
  clean: util.types.toString,
});

export const sasExpiresOnDate = input({
  label: "SAS Expires On",
  placeholder: "Enter expiry date (ISO 8601 format)",
  type: "string",
  required: true,
  comments:
    "The expiration date and time when the Shared Access Signature becomes invalid. Must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).",
  example: "2027-01-27T00:00:00Z",
  clean: util.types.toString,
});

export const sasPermissions = input({
  label: "SAS Permissions",
  placeholder: "Enter permissions (e.g., racwd)",
  type: "string",
  required: true,
  comments:
    "The permission string for the SAS token. Combine permissions in this order: 'racwdxltmeop'. Common examples: 'r' (read), 'rw' (read/write), 'racwd' (read, add, create, write, delete). [Learn more](https://learn.microsoft.com/en-us/rest/api/storageservices/create-service-sas#permissions-for-a-directory-container-or-blob)",
  example: "rw",
  clean: util.types.toString,
});
