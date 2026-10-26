import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { withTokenRefreshRetry } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { getBaseUrl } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Workday.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await withTokenRefreshRetry(
      connection,
      async (authorization) =>
        sendRawRequest(
          getBaseUrl(connection),
          {
            ...rawRequestInputs,
            debugRequest: context.debug.enabled,
          },
          { Authorization: authorization },
        ),
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
