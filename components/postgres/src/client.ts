import { Connection, ConnectionError, util } from "@prismatic-io/spectral";
import pgPromise from "pg-promise";
import { postgresConnection } from "./connections";

const pgp = pgPromise();

interface CreateDBParams {
  connection: Connection;
  castTimestampsToString?: boolean;
}

export const createDB = ({
  connection,
  castTimestampsToString = false,
}: CreateDBParams) => {
  if (connection.key !== postgresConnection.key) {
    throw new ConnectionError(
      connection,
      `Unsupported authorization method ${connection.key}.`,
    );
  }

  if (castTimestampsToString) {
    for (const timestampTypeId of [1083, 1114, 1184, 1266]) {
      pgp.pg.types.setTypeParser(timestampTypeId, (val) => val);
    }
  }

  const db = pgp({
    host: util.types.toString(connection.fields.host),
    port: util.types.toNumber(connection.fields.port),
    database: util.types.toString(connection.fields.database),
    user: util.types.toString(connection.fields.username),
    password: util.types.toString(connection.fields.password),
    ssl: util.types.toBool(connection.fields.requireSSL)
      ? { rejectUnauthorized: false }
      : false,
    connectionTimeoutMillis: util.types.toNumber(connection.fields.timeout),
  });

  return db;
};
