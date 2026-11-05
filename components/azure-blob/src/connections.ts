import { connection } from "@prismatic-io/spectral";

export const StorageSharedKey = connection({
  key: "storageSharedKey",
  display: {
    label: "Storage Shared Key",
    description:
      "Authenticates requests to Azure Blob Storage with a Storage Shared Key of an account name and key.",
  },
  inputs: {
    accountName: {
      label: "Account Name",
      placeholder: "Enter storage account name",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Azure Storage account name (3-24 characters, lowercase letters and numbers only). Find this in your Azure Portal under Storage accounts. [Learn more](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview)",
      example: "mystorageaccount123",
    },
    accountKey: {
      label: "Account Key",
      placeholder: "Enter storage account key",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The 512-bit storage account access key (Base64-encoded). Find this in Azure Portal under Storage accounts > Security + networking > Access keys. [Learn more](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage)",
      example:
        "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==",
    },
  },
});

export const connectionString = connection({
  key: "connectionString",
  display: {
    label: "Connection String",
    description: "Authenticates requests to Azure Blob Storage with a connection string.",
  },
  inputs: {
    connectionString: {
      label: "Connection String",
      placeholder: "DefaultEndpointsProtocol=https;AccountName=...",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Azure Storage connection string. Find this in Azure Portal under Storage accounts > Security + networking > Access keys > Connection string. Supports account key or SAS token authentication. [Learn more](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string)",
      example:
        "DefaultEndpointsProtocol=https;AccountName=mystorageaccount;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;EndpointSuffix=core.windows.net",
    },
  },
});

export default [StorageSharedKey, connectionString];
