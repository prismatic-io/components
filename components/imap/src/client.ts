import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { imapConnection } from "./connections";
import { ImapFlow } from "imapflow";

export const createClient = (connection: Connection, debug: boolean) => {
  if (connection.key !== imapConnection.key) {
    throw new ConnectionError(
      connection,
      `Unsupported connection provided: ${connection.key}`,
    );
  }

  const client = new ImapFlow({
    host: util.types.toString(connection.fields.host),
    port: util.types.toNumber(connection.fields.port),
    secure: util.types.toBool(connection.fields.secure),
    auth: {
      user: util.types.toString(connection.fields.user),
      pass: util.types.toString(connection.fields.pass),
    },
    tls: {
      minDHSize: util.types.toInt(connection.fields.minDHSize),
      rejectUnauthorized: true,
      minVersion: util.types.toString(connection.fields.minVersion),
      maxVersion: util.types.toString(connection.fields.maxVersion),
      ciphers: "ALL",
    },
    logger: debug ? console : false,
  });
  return client;
};
