import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";

export const createAuthorizedClient = (azureConnection: Connection) => {
  switch (azureConnection.key) {
    case "storageSharedKey":
      return new BlobServiceClient(
        `https://${azureConnection.fields.accountName}.blob.core.windows.net`,
        new StorageSharedKeyCredential(
          util.types.toString(azureConnection.fields.accountName),
          util.types.toString(azureConnection.fields.accountKey),
        ),
      );
    case "connectionString":
      return BlobServiceClient.fromConnectionString(
        util.types.toString(azureConnection.fields.connectionString),
      );
    default:
      throw new ConnectionError(azureConnection, "Unsupported Connection");
  }
};
