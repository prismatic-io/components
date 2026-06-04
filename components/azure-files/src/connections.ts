import { connection } from "@prismatic-io/spectral";

export const storageSharedKey = connection({
  key: "storageSharedKey",
  display: {
    description: "Storage Shared Key",
    label: "Storage Shared Key",
  },
  comments:
    "Authenticates requests to Azure Files with a Storage Shared Key of a username and password",
  inputs: {
    accountName: {
      label: "Account Name",
      placeholder: "Account Name",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the name for your active directory account.",
      example: "exampleName",
    },
    accountKey: {
      label: "Account Key",
      placeholder: "Account Key",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the key for your active directory account.",
      example: "exampleKey",
    },
  },
});

export const connectionString = connection({
  key: "connectionString",
  display: {
    description: "Connection String",
    label: "Connection String",
  },
  comments: "Authenticates requests to Azure files with a connection string.",
  inputs: {
    connectionString: {
      label: "Connection String",
      placeholder: "Connection String",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the connection string for your active directory account.",
      example:
        "BlobEndpoint=https://example.blob.core.windows.net/;QueueEndpoint=https://example.queue.core.windows.net/;FileEndpoint=https://example.file.core.windows.net/;TableEndpoint=https://example.table.core.windows.net/;SharedAccessSignature=sv=example=rwdlacupitfx&se=2024-05-01T03:51:00Z&st=20",
    },
  },
});

export default [storageSharedKey, connectionString];
