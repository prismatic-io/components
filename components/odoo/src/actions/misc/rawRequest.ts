import { action } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import { createOdooAwaitClient } from "../../legacy";
export const rawRequest = action({
  display: {
    label: "Raw Request (Basic Auth)",
    description:
      "Issue any execute_kw action against the Odoo XML-RPC API. Requires the Basic Authentication (Deprecated) connection.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const legacyClient = await createOdooAwaitClient(params.connection);
    const results = await legacyClient.execute_kw(
      params.model,
      params.method,
      params.parameters as unknown[],
    );
    return { data: results };
  },
});
