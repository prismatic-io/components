import { Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { xeroOAuthClientCredentials } from "./connections";

export const getTenant = async (xeroConnection: Connection, debug: boolean) => {
  const client = createHttpClient({
    baseUrl: "https://api.xero.com",
    headers: {
      Authorization: `Bearer ${util.types.toString(
        xeroConnection?.token?.access_token,
      )}`,
      Accepts: "application/json",
    },
    debug,
  });

  const { data: tenants } = await client.get("/connections");

  if (xeroConnection.key === xeroOAuthClientCredentials.key) {
    if (tenants && tenants.length > 0) {
      return tenants[0].tenantId;
    }
    throw new ConnectionError(xeroConnection, "No tenants found");
  }

  const filteredTenants = tenants.filter((tenant: Record<string, unknown>) => {
    return (
      util.types.toString(tenant.tenantName).toLowerCase().trim() ===
      util.types.toString(xeroConnection.fields.tenant).toLowerCase().trim()
    );
  });

  if (filteredTenants.length !== 1) {
    throw new ConnectionError(
      xeroConnection,
      `Unable to find a tenant matching: ${xeroConnection.fields.tenant}`,
    );
  }

  return filteredTenants[0].tenantId;
};
