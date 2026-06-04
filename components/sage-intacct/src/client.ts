import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { OnlineClient, ClientConfig } from "@intacct/intacct-sdk";
import { sageIntacctConnection } from "./connections";
import {
  type ClientProps,
  createClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { API_URL } from "./constants";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== sageIntacctConnection.key) {
    throw new ConnectionError(connection, "Invalid connection");
  }
};

export const createSdkClient = (connection: Connection): OnlineClient => {
  validateConnection(connection);
  const clientConfig = new ClientConfig();
  clientConfig.senderId = connection.fields.senderId as string;
  clientConfig.senderPassword = connection.fields.senderPassword as string;
  clientConfig.companyId = connection.fields.companyId as string;
  clientConfig.userId = connection.fields.userId as string;
  clientConfig.userPassword = connection.fields.userPassword as string;
  if (connection.fields.entityId)
    clientConfig.entityId = connection.fields.entityId as string;

  return new OnlineClient(clientConfig);
};

export const createHttpClient = (
  connection: Connection,
  clientProps: ClientProps,
) => {
  validateConnection(connection);
  clientProps.headers = {
    "Content-Type": "application/xml",
  };
  clientProps.baseUrl = API_URL;
  return createClient(clientProps);
};
