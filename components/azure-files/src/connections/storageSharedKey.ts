import { connection } from "@prismatic-io/spectral";

export const storageSharedKey = connection({
  key: "storageSharedKey",
  display: {
    description: "Authenticate using a storage shared key.",
    label: "Storage Shared Key",
  },
  comments:
    "Authenticates requests to Azure Files with a Storage Shared Key consisting of an account name and account key.",
  inputs: {
    accountName: {
      label: "Account Name",
      placeholder: "Enter account name",
      type: "string",
      required: true,
      shown: true,
      comments: "The name of the active directory account.",
      example: "exampleName",
    },
    accountKey: {
      label: "Account Key",
      placeholder: "Enter account key",
      type: "password",
      required: true,
      shown: true,
      comments: "The access key for the active directory account.",
      example: "exampleKey",
    },
  },
});
