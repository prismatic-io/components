import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRestRequestInputs } from "../../inputs/misc";
import {
  getRestAuthHeaders,
  getRestBaseUrl,
  validateRestConnection,
} from "../../util";

export const rawRestRequest = action({
  display: {
    label: "Raw Request (REST)",
    description:
      "Send a raw HTTP request to the Microsoft Advertising REST API.",
  },
  inputs: rawRestRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateRestConnection(connection);

    const { data } = await sendRawRequest(
      getRestBaseUrl(connection),
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      getRestAuthHeaders(connection),
    );

    return { data };
  },
});
