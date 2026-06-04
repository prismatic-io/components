import { action, ConnectionError } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";

export const rawRequest = action({
  display: {
    label: "Raw Request (Basic Auth)",
    description:
      "Issue any execute_kw action against the Odoo XML-RPC API. Requires the Basic Authentication (Deprecated) connection.",
  },
  inputs: rawRequestInputs,
  perform: async (_context, params) => {
    if (!isLegacyConnection(params.connection)) {
      throw new ConnectionError(
        params.connection,
        "Raw Request (Basic Auth) only supports the Basic Authentication (Deprecated) connection. Use the Raw Request (API Key) action for the API Key connection.",
      );
    }
    const legacyClient = await createOdooAwaitClient(params.connection);
    const results = await legacyClient.execute_kw(
      params.model,
      params.method,
      params.parameters as unknown[],
    );
    return { data: results };
  },
});
