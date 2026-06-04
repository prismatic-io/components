import OracleDB from "oracledb";
import { type Connection, util } from "@prismatic-io/spectral";


OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;

export const createOracleDbClient = async (connection: Connection) => {
  const { username, password, host, port, database, timeout } =
    connection.fields;
  const client = await OracleDB.getConnection({
    user: util.types.toString(username),
    password: util.types.toString(password),
    connectTimeout: util.types.toNumber(timeout),
    connectString: `${host}:${port}/${database}`,
  });
  return client;
};
