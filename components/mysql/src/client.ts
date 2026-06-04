import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  type Connection as mySqlConnection,
  createConnection as mySqlCreateConnection,
} from "mysql2/promise";
import { mySQLConnection } from "./connections";

export const createClient = async (
  connection: Connection,
  debug: boolean,
): Promise<mySqlConnection> => {
  if (connection.key !== mySQLConnection.key) {
    throw new ConnectionError(
      connection,
      `Unsupported authorization method ${connection.key}.`,
    );
  }

  return await mySqlCreateConnection({
    host: util.types.toString(connection.fields.host),
    port: util.types.toNumber(connection.fields.port),
    database: util.types.toString(connection.fields.database),
    user: util.types.toString(connection.fields.username),
    password: util.types.toString(connection.fields.password),
    debug: debug || undefined,
  });
};
