import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { sendGridConnection } from "./connections";
import client from "@sendgrid/client";
import SendGrid from "@sendgrid/mail";
import { validateConnection } from "./util";
export const createAuthorizedClient = (connection: Connection) => {
  validateConnection(connection);

  client.setApiKey(util.types.toString(connection.fields.apiKey));

  return client;
};

export const createMailClient = (connection: Connection) => {
  if (connection.key !== sendGridConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  SendGrid.setApiKey(util.types.toString(connection.fields.apiKey));
  return SendGrid;
};
