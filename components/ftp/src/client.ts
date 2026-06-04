import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import * as ftp from "basic-ftp";
import { basic } from "./connections";

export const connect = async (
  connection: Connection,
  verbose: boolean,
): Promise<ftp.Client> => {
  if (!connection || connection.key !== basic.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  const { username, password, host, port, secure, ignoreSslErrors } =
    connection.fields;

  
  const client = new ftp.Client();

  
  client.ftp.verbose = verbose;

  
  let secureVal: boolean | "implicit" = false;
  if (secure) {
    if (util.types.toString(secure).trim().toLowerCase() === "implicit") {
      secureVal = "implicit";
    } else {
      secureVal = util.types.toBool(secure);
    }
  }

  try {
    await client.access({
      host: util.types.toString(host),
      port: port ? util.types.toInt(port) : 21,
      secure: secureVal,
      user: util.types.toString(username),
      password: util.types.toString(password),
      secureOptions: {
        rejectUnauthorized: !util.types.toBool(ignoreSslErrors), 
      },
    });
  } catch (err) {
    throw new ConnectionError(
      connection,
      `Unable to connect to FTP server. ${err}`,
    );
  }

  return client;
};
