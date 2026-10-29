import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { signIn } from "./signIn";

interface GetTableauClientProps {
  tableauConnection: Connection;
  timeout?: number;
  debug: boolean;
  multipartMixed?: boolean;
  apiVersion?: string;
}

export const getTableauClient = async ({
  tableauConnection,
  apiVersion = "3.6",
  timeout,
  debug = false,
  multipartMixed = false,
}: GetTableauClientProps) => {
  if (tableauConnection.key !== "privateKey") {
    throw new ConnectionError(
      tableauConnection,
      `Unsupported authorization method ${tableauConnection.key}.`,
    );
  }
  const { credentials } = await signIn({
    tableauConnection,
    apiVersion,
  });
  const headers: Record<string, string> = {
    "X-Tableau-Auth": credentials.token,
  };

  if (multipartMixed) {
    headers["Content-type"] = "multipart/mixed";
  } else {
    headers.Accept = "application/json";
    headers["Content-type"] = "application/json";
  }
  const tableauClient = createClient({
    baseUrl: `https://${tableauConnection.fields.hostName}/api/${apiVersion}/sites/${credentials.site.id}`,
    headers,
    timeout: util.types.toInt(timeout, 2000),
    debug: util.types.toBool(debug),
  });

  return tableauClient;
};
