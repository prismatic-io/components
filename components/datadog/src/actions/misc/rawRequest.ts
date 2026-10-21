import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl } from "../../client";
import { rawRequestInputs } from "../../inputs";
import { validateConnection } from "../../utils";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to any Datadog API endpoint.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (_context, { connection: conn, ...httpInputs }) => {
    validateConnection(conn);
    const { data } = await sendRawRequest(
      getBaseUrl(conn),
      { ...httpInputs, debugRequest: false },
      getAuthHeaders(conn),
    );
    return { data };
  },
});
