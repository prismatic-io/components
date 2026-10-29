import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { Client } from "ldapts";
import { validateConnection } from "./util";

export const getLdapClient = async (
  connection: Connection,
): Promise<Client> => {
  validateConnection(connection);

  const onPremHost = util.types.toString(connection.fields.host);
  const onPremPort = util.types.toString(connection.fields.port);
  const useOnPremLdaps = util.types.toBool(connection.fields.useOnPremLdaps);
  const isOnPrem = !!onPremHost && !!onPremPort;
  const url = isOnPrem
    ? `${useOnPremLdaps ? "ldaps" : "ldap"}://${onPremHost}:${onPremPort}`
    : util.types.toString(connection.fields.url);

  if (!url) {
    throw new ConnectionError(connection, "URL input is required.");
  }
  const dn = util.types.toString(connection.fields.dn);
  const password = util.types.toString(connection.fields.password);
  const ca =
    util.types.toString(connection.fields.certificate).trim() || undefined;
  const client = new Client({
    url,

    tlsOptions: ca
      ? {
          ca,
        }
      : undefined,
  });

  try {
    await client.bind(dn, password);
  } catch (err) {
    await client.unbind();
    throw new Error(`LDAP Bind Error: ${err}`);
  }

  return client;
};
