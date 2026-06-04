import {
  ShareServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-file-share";
import { Connection, ConnectionError, util } from "@prismatic-io/spectral";

export const createAuthorizedClient = (azureConnection: Connection) => {
  switch (azureConnection.key) {
    case "storageSharedKey":
      return new ShareServiceClient(
        `https://${azureConnection.fields.accountName}.file.core.windows.net`,
        new StorageSharedKeyCredential(
          util.types.toString(azureConnection.fields.accountName),
          util.types.toString(azureConnection.fields.accountKey),
        ),
      );
    case "connectionString":
      return ShareServiceClient.fromConnectionString(
        util.types.toString(azureConnection.fields.connectionString),
      );

    default:
      throw new ConnectionError(
        azureConnection,
        `Unsupported connection ${azureConnection.key}.`,
      );
  }
};
