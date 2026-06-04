import { Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { signIn } from "./signIn";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

interface GetTableuClientProps {
  tableauConnection: Connection;
  timeout?: number;
  debug: boolean;
  multipartMixed?: boolean;
  apiVersion?: string;
}

export const getTableuClient = async ({
  tableauConnection,
  apiVersion = "3.6",
  timeout,
  debug = false,
  multipartMixed = false,
}: GetTableuClientProps) => {
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
  });
  if (util.types.toBool(debug) === true) {
    tableauClient.interceptors.request.use((request) => {
      console.log(JSON.stringify(request));
      return request;
    });
    tableauClient.interceptors.response.use((response) => {
      console.log(response.status);
      console.log(JSON.stringify(response.data));
      return response;
    });
  }

  return tableauClient;
};

export { signIn };
